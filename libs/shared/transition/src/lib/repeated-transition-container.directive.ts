import { Directive, ElementRef, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AttributeNameRepeatedTransitionUrl } from './attribute-name-repeated-transition-url';

@Directive({
  selector: '[vwtRepeatedTransitionContainer]',
  standalone: true,
})
export class RepeatedTransitionContainerDirective {
  private readonly router = inject(Router);
  private readonly hostDOM: HTMLElement = inject(ElementRef).nativeElement;

  @Input('vwtRepeatedTransitionContainer')
  public set path(commands: unknown[] | string) {
    const cmds = Array.isArray(commands) ? commands : [commands];
    const url = this.router.createUrlTree(cmds).toString();
    this.hostDOM.setAttribute(AttributeNameRepeatedTransitionUrl, url);
  }
}
