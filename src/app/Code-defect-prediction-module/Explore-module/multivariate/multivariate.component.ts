import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-multivariate',
  templateUrl: './multivariate.component.html',
  styleUrls: ['./multivariate.component.css']
})
export class MultivariateComponent implements OnInit {

  public options = [
    'HOUR_OF_THE_DAY',
    'CC_VALUE-BASED_REVISION',
    'CC_VALUE_LATEST_REVISION',
    'TIMES_FILE_MODIFIED',
    'LINES_ADDED',
    'LINES_DELETED',
    'LINES_MODIFIED',
    'LEN_OF_COMMIT_MSG'
  ];
  public histogram = [];
  public boxPlot = [];
  public  dataSet = [
    {
      data:  [2, 7, 3, 8, 2],
      backgroundColor:  '#74a9cd',
      hoverBackgroundColor:  '#74a9cd'
    }
  ];
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.plotHistogram();
    this.plotBoxPlot();
  }

  public plotHistogram() {
    this.histogram = this.globalService.makeRoundedBarGraph('histogram', ['A', 'B', 'C', 'E', 'F'], this.dataSet);
  }

  public plotBoxPlot() {
    this.boxPlot = this.globalService.makeRoundedBarGraph('boxPlot', ['A', 'B', 'C', 'E', 'F'], this.dataSet);
  }
}
