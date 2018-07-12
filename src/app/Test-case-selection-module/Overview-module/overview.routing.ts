import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { OverviewContainerComponent } from "./overview-container/overview-container.component";
import { OverviewComponent } from "./overview/overview.component";

const routes: Routes = [
    {
        path: '', component: OverviewContainerComponent,
        children: [
            { path: '', component: OverviewComponent }
        ]
    }
];

export const router: ModuleWithProviders = RouterModule.forChild(routes);