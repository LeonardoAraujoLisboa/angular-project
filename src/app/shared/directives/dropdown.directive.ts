import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event']) handleClickDropdown(
    //essa solução é para quando eu clicar em qualquer outro lugar da página o dropdown fechar,
    //mas poderia ser so com 'click'
    event: Event
  ) {
    /* if (this.elementRef.nativeElement.classList.contains('open')) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    } */

    /* this.isOpen = !this.isOpen; */ //oooou posso fazer assim (mais simples)

    this.isOpen = this.elementRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false; //essa solução é para quando eu clicar em qualquer outro lugar da página o dropdown fechar
  }
}
