/* eslint-disable @angular-eslint/directive-selector */
import {
  ComponentRef,
  Directive,
  EnvironmentInjector,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  Data,
  PRIMARY_OUTLET,
  Router,
  RouterOutletContract,
} from '@angular/router';
import { ChangeDetectionCoordinator } from './change-detection-coordinator';
import { DeferredPromise } from '@ngx-cocktail-view-animations/shared/utils';
import { AttributeNameRepeatedTransitionUrl } from './attribute-name-repeated-transition-url';
import { AttributeNameRepeatedTransition } from './attribute-name-repeated-transition';

@Directive({
  selector: 'vwt-router-outlet',
  standalone: true,
})
export class VwtRouterOutletDirective
  implements OnDestroy, OnInit, OnChanges, RouterOutletContract
{
  @Input() name = PRIMARY_OUTLET;

  private readonly router = inject(Router);
  private readonly parentContexts = inject(ChildrenOutletContexts);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly cdCoordinator = inject(ChangeDetectionCoordinator);

  private activated: ComponentRef<any> | null = null;
  private _activatedRoute: ActivatedRoute | null = null;
  private updateDOMPromise: DeferredPromise<() => void> | null = null;
  private cleanupDOMPromise: DeferredPromise<() => void> | null = null;

  get isActivated(): boolean {
    return !!this.activated;
  }

  get component(): object {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this.activated.instance;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.activated) throw new Error('Outlet is not activated');
    return this._activatedRoute as ActivatedRoute;
  }

  get activatedRouteData(): Data {
    return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['name']) {
      return;
    }
    const { firstChange, previousValue } = changes['name'];
    if (firstChange) {
      // The first change is handled by ngOnInit. Because ngOnChanges doesn't get called when no
      // input is set at all, we need to centrally handle the first change there.
      return;
    }

    // unregister with the old name
    if (this.isTrackedInParentContexts(previousValue)) {
      this.deactivate();
      this.parentContexts.onChildOutletDestroyed(previousValue);
    }
    // register the new name
    this.initializeOutletWithName();
  }

  ngOnInit(): void {
    this.initializeOutletWithName();
  }

  private isTrackedInParentContexts(outletName: string) {
    return this.parentContexts.getContext(outletName)?.outlet === this;
  }

  private initializeOutletWithName() {
    this.parentContexts.onChildOutletCreated(this.name, this);
    if (this.activated) {
      return;
    }

    // If the outlet was not instantiated at the time the route got activated we need to populate
    // the outlet when it is initialized (ie inside a NgIf)
    const context = this.parentContexts.getContext(this.name);
    if (context?.route) {
      if (context.attachRef) {
        // `attachRef` is populated when there is an existing component to mount
        this.attach(context.attachRef, context.route);
      } else {
        // otherwise the component defined in the configuration is created
        this.activateWith(context.route, context.injector);
      }
    }
  }

  ngOnDestroy(): void {
    // Ensure that the registered outlet is this one before removing it on the context.
    if (this.isTrackedInParentContexts(this.name)) {
      this.parentContexts.onChildOutletDestroyed(this.name);
    }
  }

  detach(): ComponentRef<any> {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    const detachedCmp = this.activated;

    const destinationUrl = this.getDestinationUrl();
    this.setViewTransitionAttr(destinationUrl, (x) => x);

    this.updateDOMPromise = new DeferredPromise();
    this.cleanupDOMPromise = new DeferredPromise();
    this.configureAndStartViewTransition(
      () => {
        this.activated = null;
        this._activatedRoute = null;
        this.viewContainerRef.detach();
      },
      this.updateDOMPromise,
      this.cleanupDOMPromise
    );
    return detachedCmp;
  }

  attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
    const departureUrl = this.getDepartureUrl();

    const attachCompFn = () => {
      this.activated = ref;
      this._activatedRoute = activatedRoute;
      this.viewContainerRef.insert(ref.hostView);
      this.activated.changeDetectorRef.detectChanges();

      // logic to activate repeatedContext item (detail => overview)
      this.setViewTransitionAttr(departureUrl, (x) => x);
    };

    if (this.updateDOMPromise) {
      // mark navigation as "finished"
      this.updateDOMPromise.resolve(attachCompFn);
    } else {
      // when no transition is going (first load, then execute immediately)
      attachCompFn();
    }

    if (this.cleanupDOMPromise) {
      this.cleanupDOMPromise.resolve(() =>
        this.setViewTransitionAttr(departureUrl, () => 'none')
      );
    }
  }

  deactivate(): void {
    const destinationUrl = this.getDestinationUrl();

    this.setViewTransitionAttr(destinationUrl, (x) => x);

    this.updateDOMPromise = new DeferredPromise();
    this.cleanupDOMPromise = new DeferredPromise();
    this.configureAndStartViewTransition(
      () => {
        if (!this.activated) {
          return;
        }
        this.activated?.destroy();
        this.activated = null;
        this._activatedRoute = null;
      },
      this.updateDOMPromise,
      this.cleanupDOMPromise
    );
  }

  activateWith(
    activatedRoute: ActivatedRoute,
    resolverOrInjector?: EnvironmentInjector | null | any
  ) {
    const departureUrl = this.getDepartureUrl();

    const createNewCompFn = () => {
      if (this.isActivated) {
        throw new Error('Cannot activate an already activated outlet');
      }

      this._activatedRoute = activatedRoute;
      const vcRef = this.viewContainerRef;
      const componentType = activatedRoute.snapshot.component!;
      const injector = Injector.create({
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          {
            provide: ChildrenOutletContexts,
            useValue: this.parentContexts.getOrCreateContext(this.name)
              .children,
          },
        ],
        parent: vcRef.injector,
      });

      const environmentInjector =
        resolverOrInjector ?? this.environmentInjector;
      this.activated = vcRef.createComponent(componentType, {
        index: vcRef.length,
        injector,
        environmentInjector,
      });
      this.activated.changeDetectorRef.detectChanges();

      // logic to activate repeatedContext item (detail => overview)
      this.setViewTransitionAttr(departureUrl, (x) => x);
    };

    if (this.updateDOMPromise) {
      // mark navigation as "finished"
      this.updateDOMPromise.resolve(createNewCompFn);
    } else {
      // when no transition is going (first load, then execute immediately)
      createNewCompFn();
    }

    if (this.cleanupDOMPromise) {
      this.cleanupDOMPromise.resolve(() =>
        this.setViewTransitionAttr(departureUrl, () => 'none')
      );
    }
  }

  private async configureAndStartViewTransition(
    afterFirstScreenshotfn: () => void,
    addNewDOMDeferred: DeferredPromise<() => void>,
    cleanupDOMDeferred?: DeferredPromise<() => void>
  ) {
    if (!(document as any).startViewTransition) {
      afterFirstScreenshotfn();
    } else {
      const transition = (document as any).startViewTransition(async () => {
        // execute all the logic inside the transition
        afterFirstScreenshotfn();
        // wait for the promise to be resolved. this is usefull because activate/deactivate are separate.
        const updateDOMFn = await addNewDOMDeferred.promise;
        updateDOMFn();
        // Outlets need to wait for change detection to finish. There's no hook for this in Angular at the moment.
        await this.cdCoordinator.schedule();
      });

      if (cleanupDOMDeferred) {
        await transition.finished;
        const cleanupDOMFn = await cleanupDOMDeferred.promise;
        cleanupDOMFn();
      }
    }
  }

  private getRepeatedTransitionContainers(
    component: ComponentRef<unknown> | undefined | null
  ): { url: string; elem: Element }[] {
    if (!component) {
      return [];
    }

    const componentDOM = component.location.nativeElement as HTMLElement;
    return Array.from(
      componentDOM.querySelectorAll(`[${AttributeNameRepeatedTransitionUrl}]`)
    ).map((ctx) => {
      const urlCtx = ctx.getAttribute(AttributeNameRepeatedTransitionUrl);
      return { url: urlCtx || '', elem: ctx };
    });
  }

  private getViewTransitionElementsWithinContainer(
    container: Element | undefined | null
  ): { name: string; elem: Element }[] {
    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll('[' + AttributeNameRepeatedTransition + ']')
    ).map((elem) => {
      const transitionName = elem.getAttribute(AttributeNameRepeatedTransition);
      return { name: transitionName || '', elem };
    });
  }

  private getDestinationUrl(): string | undefined {
    return this.router.getCurrentNavigation()?.finalUrl?.toString();
  }

  private getDepartureUrl(): string | undefined {
    return this.router
      .getCurrentNavigation()
      ?.previousNavigation?.finalUrl?.toString();
  }

  private setViewTransitionAttr(
    url: string | undefined,
    transitionNamefn: (configuredTransitionName: string) => string
  ) {
    const transitionContainer = this.getRepeatedTransitionContainers(
      this.activated
    ).find((x) => x.url === url)?.elem;
    this.getViewTransitionElementsWithinContainer(transitionContainer).forEach(
      (item) => {
        item.elem.setAttribute(
          'style',
          'view-transition-name: ' + transitionNamefn(item.name)
        );
      }
    );
  }
}
