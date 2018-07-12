import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { PipelineService } from '../../../services/pipeline.service';
import * as CanvasJS from './canvasjs.min';
import { ActivatedRoute } from '@angular/router';
import { ExploreService } from '../explore.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-univariate',
  templateUrl: './univariate.component.html',
  styleUrls: ['./univariate.component.css']
})
export class UnivariateComponent implements OnInit {

  public options = [];
  public histogram: any;
  public boxPlot = [];
  public univariateData;
  public optionSelected;
  public dataToBeUsed;
  public frequency = [];
  public dataValue = [];
  public projects;
  public project;
  constructor(private pipelineService: PipelineService, private globalService: GlobalService, private exploreService: ExploreService,
    private productService: ProductService) {
    this.globalService.productsFetched$.subscribe(
      data => {
        this.getProjects();
      }
    );
    this.globalService.changeProduct$.subscribe(
      data => {
        this.getProjects();
      }
    );
  }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.getProjects();
    }
  }

  public getProjects() {
    this.productService.getProjectsList(this.globalService.product.productID).subscribe(
      data => {
        this.projects = data.result.details;
        this.project = this.projects[0];
        this.getUnivariateData();
      },
      error => {
        console.log('error-' + JSON.stringify(error));
      }
    );
  }

  public getUnivariateData() {
    this.pipelineService.getUnivariateData(this.project.projectId).subscribe(
      data => {
        this.univariateData = data.univariate;
        this.options = Object.keys(data.univariate);
        this.optionSelected = this.options[0];
        const histogramLabels = data.univariate[this.optionSelected].histogram.map(item => item.number);
        const histogramData = data.univariate[this.optionSelected].histogram.map(item => item.frequency);
        const dataSet = [{
          data: histogramData,
          backgroundColor: '#74a9cd',
          hoverBackgroundColor: '#74a9cd',
          borderWidth: 1
        }];
        this.histogram = this.globalService.makeRoundedBarGraph('histogram', histogramLabels, dataSet);

        const boxPlotData = [
          +this.univariateData[this.optionSelected].boxPlot.minimum,
          +this.univariateData[this.optionSelected].boxPlot.firstQuart,
          +this.univariateData[this.optionSelected].boxPlot.thirdQuart,
          +this.univariateData[this.optionSelected].boxPlot.maximum,
          +this.univariateData[this.optionSelected].boxPlot.median,
        ];
        const chart = this.globalService.plotBoxPlot('chartContainer', boxPlotData);
        chart.render();

      }, error => {
        console.log('error' + JSON.stringify(error));
      });
  }

  public changeFilter() {
    const histogramLabels = this.univariateData[this.optionSelected].histogram.map(item => item.number);
    const histogramData = this.univariateData[this.optionSelected].histogram.map(item => item.frequency);
    this.histogram.data.labels = histogramLabels;
    this.histogram.data.datasets[0].data = histogramData;
    this.histogram.update();
    const boxPlotData = [
      +this.univariateData[this.optionSelected].boxPlot.minimum,
      +this.univariateData[this.optionSelected].boxPlot.firstQuart,
      +this.univariateData[this.optionSelected].boxPlot.thirdQuart,
      +this.univariateData[this.optionSelected].boxPlot.maximum,
      +this.univariateData[this.optionSelected].boxPlot.median,
    ];
    const chart = this.globalService.plotBoxPlot('chartContainer', boxPlotData);
    chart.render();
  }
}
