import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { router } from './app.routing';
import { OverviewService } from './services/overview.service';
import { GlobalService } from './global.service';
import { Configuration } from './app.constants';
import { ContainerComponent } from './container/container.component';
import { LeftPaneComponent } from './left-pane/left-pane.component';
import { HeadersComponent } from './headers/headers.component';
import { DateFeatureService } from './services/date-feature.service';
import { DefectPredictionService } from './services/defect-prediction.service';
import { PipelineService } from './services/pipeline.service';
import { PreprocesseedService } from './services/preprocesseed.service';
import { ProductService } from './services/product.service';
import { LoginComponent } from './login/login.component';
import { SessionService } from './session-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileService } from './services/file.service';
import { ExecutionResultService } from './services/execution-result.service'; 

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LeftPaneComponent,
    HeadersComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    router,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    OverviewService,
    GlobalService,
    Configuration,
    DateFeatureService,
    DefectPredictionService,
    PipelineService,
    PreprocesseedService,
    ProductService,
    SessionService,
    FileService,
    ExecutionResultService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
