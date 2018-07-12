import { NgModule } from '@angular/core';
import { OptimiseContainerComponent } from './optimise-container/optimise-container.component';
import { ProgressionTestComponent } from './progression-test/progression-test.component';
import { TabsOptimiseComponent } from './tabs-optimise/tabs-optimise.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { router } from './optimise.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { OptimiseService } from './optimise.service';
import { RegressionTestComponent } from './regression-test/regression-test.component';

@NgModule({
    imports: [
        CommonModule,
        router,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    declarations: [
        OptimiseContainerComponent,
        ProgressionTestComponent,
        TabsOptimiseComponent,
        RegressionTestComponent
    ],
    providers: [
        OptimiseService
    ]
})

export class OptimiseModule { }
