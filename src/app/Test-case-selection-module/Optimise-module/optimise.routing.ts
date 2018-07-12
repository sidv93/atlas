import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { OptimiseContainerComponent } from './optimise-container/optimise-container.component';
import { ProgressionTestComponent } from './progression-test/progression-test.component';
import { RegressionTestComponent } from './regression-test/regression-test.component';

const routes: Routes = [
    {
        path: '', component: OptimiseContainerComponent, children: [
            { path: 'progression-test', component: ProgressionTestComponent },
            { path: 'regression-test', component: RegressionTestComponent },
            { path: '', redirectTo: 'progression-test' }
        ]
    }
]

export const router: ModuleWithProviders = RouterModule.forChild(routes);
