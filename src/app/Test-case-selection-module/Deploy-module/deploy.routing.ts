import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DeployContainerComponent } from './deploy-container/deploy-container.component';
import { ExecutionResultsComponent } from './execution-results/execution-results.component';
import { ReleaseHistoryComponent } from './release-history/release-history.component';

const routes: Routes = [
    {
        path: '', component: DeployContainerComponent,
        children: [
            {
                path: 'execution-results', component: ExecutionResultsComponent,
            },
            {
                path: 'release-history', component: ReleaseHistoryComponent,
            },
            { path: '', redirectTo: 'execution-results', pathMatch: 'full' }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);
