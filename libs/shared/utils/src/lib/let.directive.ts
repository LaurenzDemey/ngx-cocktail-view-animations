import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  cwLet: T;
}

@Directive({
  selector: '[cwLet]',
  standalone: true,
})
export class LetDirective<T> {
  private readonly context: LetContext<T | undefined> = { cwLet: undefined };

  public static ngTemplateContextGuard<T>(
    _dir: LetDirective<T>,
    ctx: unknown
  ): ctx is LetContext<T> {
    return true;
  }

  public constructor(
    viewContainer: ViewContainerRef,
    templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  // eslint-disable-next-line
  @Input()
  public set cwLet(value: T) {
    this.context.cwLet = value;
  }
}
