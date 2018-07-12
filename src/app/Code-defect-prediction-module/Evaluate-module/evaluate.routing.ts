import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TrainingPipelinesComponent } from './training-pipelines/training-pipelines.component';
import { TrainingRunsComponent } from './training-runs/training-runs.component';
import { TrainingResultsComponent } from './training-results/training-results.component';
import { EvaluateContainerComponent } from './evaluate-container/evaluate-container.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
    {
        path: '', component: EvaluateContainerComponent,
        children: [
            { path: 'training-pipelines', component: TrainingPipelinesComponent },
            { path: 'training-runs', component: TrainingRunsComponent },
            { path: 'training-results', component: TrainingResultsComponent },
            { path: 'logs', component: LogsComponent },
            { path: '', redirectTo: 'training-pipelines' }
        ]
    },

];

export const router: ModuleWithProviders = RouterModule.forChild(routes);
