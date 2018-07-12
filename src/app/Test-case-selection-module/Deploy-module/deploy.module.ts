import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { router } from './deploy.routing';
import { DeployContainerComponent } from './deploy-container/deploy-container.component';
import { ExecutionResultsComponent } from './execution-results/execution-results.component';
import { ReleaseHistoryComponent } from './release-history/release-history.component';
import { TabsDeployComponent } from './tabs-deploy/tabs-deploy.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        router,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        DeployContainerComponent,
        ExecutionResultsComponent,
        ReleaseHistoryComponent,
        TabsDeployComponent
   ],
    providers: [

    ]
})

export class DeployModule { }
