import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { router } from './evaluate.routing';
import { TrainingPipelinesComponent } from './training-pipelines/training-pipelines.component';
import { TrainingResultsComponent } from './training-results/training-results.component';
import { TrainingRunsComponent } from './training-runs/training-runs.component';
import { TabsEvaluateComponent } from './tabs-evaluate/tabs-evaluate.component';
import { EvaluateContainerComponent } from './evaluate-container/evaluate-container.component';
import { EvaluateService } from './evaluate.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { LogsComponent } from './logs/logs.component';

@NgModule({
    declarations: [
        TabsEvaluateComponent,
        TrainingPipelinesComponent,
        TrainingResultsComponent,
        TrainingRunsComponent,
        EvaluateContainerComponent,
        LogsComponent
    ],
    imports: [
        CommonModule,
        router,
        NgxPaginationModule
    ],
    providers: [
        EvaluateService
    ]
})

export class EvaluateModule {}
