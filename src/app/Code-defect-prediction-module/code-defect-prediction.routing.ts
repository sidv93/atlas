import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CDPContainerComponent } from './cdp-container/cdp-container.component';

const routes: Routes = [
    {
        path: '',
        component: CDPContainerComponent,
        children: [
            { path: 'overview', loadChildren: 'app/Code-defect-prediction-module/Overview-module/overview.module#OverviewModule' },
            { path: 'deploy', loadChildren: 'app/Code-defect-prediction-module/Deploy-module/deploy.module#DeployModule' },
            { path: 'explore', loadChildren: 'app/Code-defect-prediction-module/Explore-module/explore.module#ExploreModule' },
            { path: 'evaluate', loadChildren: 'app/Code-defect-prediction-module/Evaluate-module/evaluate.module#EvaluateModule' },
            { path: '', redirectTo: 'deploy' }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);
