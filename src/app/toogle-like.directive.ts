import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appToogleLike]'
})
export class ToogleLikeDirective {
  @HostBinding('class') class: string;
  @HostListener('click') click(eventData: Event) {
    console.log(eventData);
  }
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

}
