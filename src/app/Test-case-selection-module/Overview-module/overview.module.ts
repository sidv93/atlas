import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { router } from "./overview.routing";
import { OverviewComponent } from './overview/overview.component';
import { OverviewContainerComponent } from './overview-container/overview-container.component';

@NgModule({
    imports: [
        CommonModule,
        router
    ],
    declarations: [
        OverviewComponent,
        OverviewContainerComponent
    ],
    providers: [

    ]
})

export class OverviewModule { }
