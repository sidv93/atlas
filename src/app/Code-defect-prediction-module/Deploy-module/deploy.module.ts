import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { router } from './deploy.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeployContainerComponent } from './deploy-container/deploy-container.component';
import { DefectPredictionComponent } from './defect-prediction/defect-prediction.component';
import { FileDifferenceComponent } from './file-difference/file-difference.component';
import { FileHistoryComponent } from './file-history/file-history.component';
import { StaticAnalysisComponent } from './static-analysis/static-analysis.component';
import { TabsDeployComponent } from './tabs-deploy/tabs-deploy.component';
import { ReviewCommentsComponent } from './review-comments/review-comments.component';
import { DeployService } from './deploy.service';

@NgModule({
    declarations: [
        DeployContainerComponent,
        DefectPredictionComponent,
        FileDifferenceComponent,
        FileHistoryComponent,
        StaticAnalysisComponent,
        ReviewCommentsComponent,
        TabsDeployComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        router
    ],
    providers: [
        DeployService
    ]
})

export class DeployModule { }
