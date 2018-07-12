import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { router } from './explore.routing';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { TabsExploreComponent } from './tabs-explore/tabs-explore.component';
import { UnivariateComponent } from './univariate/univariate.component';
import { MultivariateComponent } from './multivariate/multivariate.component';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { TextComponent } from './text/text.component';
import { FilesComponent } from './files/files.component';
import { FormsModule } from '@angular/forms';
import { ExploreService } from './explore.service';

@NgModule({
    declarations: [
        ExploreContainerComponent,
        TabsExploreComponent,
        UnivariateComponent,
        MultivariateComponent,
        TimeSeriesComponent,
        TextComponent,
        FilesComponent
    ],
    imports: [
        CommonModule,
        router,
        FormsModule
    ],
    providers: [
        ExploreService
    ]
})

export class ExploreModule { }
