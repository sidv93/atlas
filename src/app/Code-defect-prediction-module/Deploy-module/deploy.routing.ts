import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DeployContainerComponent } from './deploy-container/deploy-container.component';
import { DefectPredictionComponent } from './defect-prediction/defect-prediction.component';
import { StaticAnalysisComponent } from './static-analysis/static-analysis.component';
import { ReviewCommentsComponent } from './review-comments/review-comments.component';
import { FileDifferenceComponent } from './file-difference/file-difference.component';
import { FileHistoryComponent } from './file-history/file-history.component';

const routes: Routes = [
    {
        path: '', component: DeployContainerComponent,
        children: [
            { path: 'defect-prediction', component: DefectPredictionComponent },
            { path: 'static-analysis', component: StaticAnalysisComponent },
            { path: 'review-comments', component: ReviewCommentsComponent },
            { path: 'file-difference', component: FileDifferenceComponent },
            { path: 'file-history', component: FileHistoryComponent },
            { path: '', redirectTo: 'defect-prediction' }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);
