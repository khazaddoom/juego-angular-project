import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { LoadingspinnerComponent } from './loadingspinner/loadingspinner.component';
import { AlertComponent } from './alert/alert.component';
import { AlertmodalDirective } from './alertmodal.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingspinnerComponent,
        AlertComponent,
        AlertmodalDirective
    ],
        
    entryComponents: [
        AlertComponent
    ],

    exports: [
        DropdownDirective,
        LoadingspinnerComponent,
        AlertmodalDirective
    ]
})
export class SharedModule {}