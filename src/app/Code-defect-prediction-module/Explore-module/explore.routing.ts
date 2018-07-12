import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { UnivariateComponent } from './univariate/univariate.component';
import { MultivariateComponent } from './multivariate/multivariate.component';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { TextComponent } from './text/text.component';
import { FilesComponent } from './files/files.component';

const routes: Routes = [
    {
        path: '', component: ExploreContainerComponent,
        children: [
            { path: 'univariate', component: UnivariateComponent },
            { path: 'multivariate', component: MultivariateComponent },
            { path: 'time-series', component: TimeSeriesComponent },
            { path: 'text', component: TextComponent },
            { path: 'files', component: FilesComponent },
            { path: '', redirectTo: 'univariate' }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);
