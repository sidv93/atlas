import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TcsContainerComponent } from './tcs-container/tcs-container.component';

const routes: Routes = [
    {
        path: '', component: TcsContainerComponent,
        children: [
            {
                path: 'overview', loadChildren: 'app/Test-case-selection-module/Overview-module/overview.module#OverviewModule',
            },
            {
                path: 'deploy', loadChildren: 'app/Test-case-selection-module/Deploy-module/deploy.module#DeployModule',
            },
            {
                path: 'optimise', loadChildren: 'app/Test-case-selection-module/Optimise-module/optimise.module#OptimiseModule',
            },
            {
                path: '', redirectTo: 'deploy'
            }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);