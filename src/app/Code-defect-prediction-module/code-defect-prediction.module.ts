import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { router } from './code-defect-prediction.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CDPContainerComponent } from './cdp-container/cdp-container.component';
import { ProductService } from '../services/product.service';
import { TabsCDPComponent } from './tabs-cdp/tabs-cdp.component';

@NgModule({
    declarations: [
        CDPContainerComponent,
        TabsCDPComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        router,
    ],
    providers: [
    ]
})

export class CodeDefectPredictionModule { }
