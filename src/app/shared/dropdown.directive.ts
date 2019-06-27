import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') clicked = false;

  @HostListener('click') onMouseClick() {
    this.clicked = !this.clicked;
  }

}
