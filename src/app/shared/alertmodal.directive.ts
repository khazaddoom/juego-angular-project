import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlertmodal]'
})
export class AlertmodalDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
