import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewContainerComponent } from './overview-container/overview-container.component';
import { OverviewComponent } from './overview/overview.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { router } from './overview.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        OverviewContainerComponent,
        OverviewComponent
    ],
    imports: [
        CommonModule,
        router,
        NgxPaginationModule,
        FormsModule
    ],
    providers: [

    ]
})

export class OverviewModule {}
