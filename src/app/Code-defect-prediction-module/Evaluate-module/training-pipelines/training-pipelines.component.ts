import { Component, OnInit } from '@angular/core';
import { PipelineService } from '../../../services/pipeline.service';
import { GlobalService } from '../../../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluateService } from '../evaluate.service';

@Component({
  selector: 'app-training-pipelines',
  templateUrl: './training-pipelines.component.html',
  styleUrls: ['./training-pipelines.component.css']
})
export class TrainingPipelinesComponent implements OnInit {

  public loading = false;
  public pipelines = [];
  public currentPage = 1;
  constructor(private pipelineService: PipelineService, private globalService: GlobalService, private router: Router,
    private route: ActivatedRoute, private evaluateService: EvaluateService) {
    this.globalService.changeProduct$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
    this.globalService.productsFetched$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
  }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.getPipelineData();
    }
  }

  public getPipelineData() {
    this.loading = true;
    this.pipelineService.getTrainingPipelineData(this.globalService.product.productID).subscribe(
      data => {
        this.pipelines = data.result.pipelineListing.details;
        this.loading = false;
      },
      error => {
        console.log('error-' + JSON.stringify(error));
        this.loading = false;
      }
    );
  }

  public viewRuns(pipeline: any) {
    console.log('pipe=' + JSON.stringify(pipeline));
    this.evaluateService.pipeline = pipeline;
    this.evaluateService.router$.next(1);
    this.router.navigate(['../training-runs'], { relativeTo: this.route } );
  }

  public viewResults() {
    this.evaluateService.router$.next(2);
    this.router.navigate(['../training-results'], { relativeTo: this.route});
  }

}
