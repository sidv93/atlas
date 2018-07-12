import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { router } from './test-case-selection.routing';
import { TcsContainerComponent } from './tcs-container/tcs-container.component';
import { TabsTcsComponent } from './tabs-tcs/tabs-tcs.component';

@NgModule({
    imports: [
        CommonModule,
        router
    ],
    declarations: [

    TcsContainerComponent,

    TabsTcsComponent],
    providers: [

    ]
})

export class TestCaseSelectionModule { }
