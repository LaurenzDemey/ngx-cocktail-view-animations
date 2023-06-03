import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { AttributeNameRepeatedTransition } from './attribute-name-repeated-transition';
import { RepeatedTransitionContainerDirective } from './repeated-transition-container.directive';

@Directive({
  selector: '[vwtTransitionName]',
  standalone: true,
})
export class TransitionNameDirective implements OnChanges {
  @Input('vwtTransitionName')
  transitionName = '';

  @HostBinding('style.view-transition-name')
  fixedTransitionNameCss?: string;

  private readonly repeatedTransitionContainer = inject(
    RepeatedTransitionContainerDirective,
    {
      optional: true,
    }
  );
  private readonly hostDOM: HTMLElement = inject(ElementRef).nativeElement;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transitionName']) {
      this.calculateFixedTransitionNameCss();
    }
  }

  private calculateFixedTransitionNameCss() {
    if (!this.transitionName) {
      this.hostDOM.removeAttribute(AttributeNameRepeatedTransition);
      return;
    }
    if (!this.repeatedTransitionContainer) {
      this.fixedTransitionNameCss = this.transitionName;
      this.hostDOM.removeAttribute(AttributeNameRepeatedTransition);
    } else {
      this.hostDOM.setAttribute(
        AttributeNameRepeatedTransition,
        this.transitionName
      );
    }
  }
}
