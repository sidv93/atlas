import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: ContainerComponent,
        children: [
            {
                path: 'code-defect-prediction',
                loadChildren: 'app/Code-defect-prediction-module/code-defect-prediction.module#CodeDefectPredictionModule',
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'test-case-selection',
                loadChildren: 'app/Test-case-selection-module/test-case-selection.module#TestCaseSelectionModule'
            },
            { path: '', redirectTo: 'code-defect-prediction', pathMatch: 'full'}
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes);
