import { Component, OnInit } from '@angular/core';
import { PipelineService } from '../../../services/pipeline.service';
import { GlobalService } from '../../../global.service';
import { EvaluateService } from '../evaluate.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-training-runs',
  templateUrl: './training-runs.component.html',
  styleUrls: ['./training-runs.component.css']
})
export class TrainingRunsComponent implements OnInit {

  public loading = false;
  public runs = [];
  public currentPage = 1;
  constructor(private pipelineService: PipelineService, private globalService: GlobalService,
    private evaluateService: EvaluateService, private route: ActivatedRoute, private router: Router) {
    this.globalService.changeProduct$.subscribe(
      data => {
        this.evaluateService.router$.next(0);
        this.router.navigate(['../training-pipelines'], { relativeTo: this.route});
      }
    );
   }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.getTrainingRunsData();
    }
  }

  public getTrainingRunsData() {
    console.log('pipe-' + JSON.stringify(this.evaluateService.pipeline));
    this.pipelineService.getTrainingRunData(this.evaluateService.pipeline.pipelineid).subscribe(
      data => {
        console.log('run data=' + JSON.stringify(data));
        this.runs = data.result.details;
        this.runs.forEach(item => {
          let date1 = moment(item.runStartTime);
          let date2 = moment(item.runEndTime);
          const minDiff = date2.diff(date1, 'minutes');
          item.duration = Math.round((+minDiff / 60 )) + ' Hour(s) ' + (+minDiff % 60 ) + ' minute(s)';
        });
        console.log('runs- ' + JSON.stringify(this.runs));
      },
      error => {
        console.log('error-' + JSON.stringify(error));
      }
    );
  }

  public viewResults() {
    this.evaluateService.router$.next(2);
    this.router.navigate(['../training-results'], { relativeTo: this.route});
  }

}
