import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { OverviewService } from '../../../services/overview.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public productionRelease;
  public regressionSummary;
  public sprintFailure;
  public sprintSummary;
  public passedRelease = 0;
  public failedRelease = 0;
  public passedSprint = 0;
  public failedSprint = 0;
  constructor(private globalService: GlobalService, private overviewService: OverviewService) { }

  ngOnInit() {
    this.getRegressionData();
    this.getSprintTesting();
  }

  public getRegressionData() {
    this.overviewService.getRegressionData('Unigy', 'U_C_P_2.0').subscribe(
      data => {
        const regressionData = data.Data;
        const productReleaseLabels = ['P1', 'P2', 'P3', 'P4', 'P5'];
        const productReleasePassData = [regressionData.P1.Pass, regressionData.P2.Pass, regressionData.P3.Pass,
        regressionData.P4.Pass, regressionData.P5.Pass];
        const productReleaseFailData = [regressionData.P1.Fail, regressionData.P2.Fail, regressionData.P3.Fail,
        regressionData.P4.Fail, regressionData.P5.Fail];
        const productReleaseNEData = [regressionData.P1.Not_executed, regressionData.P2.Not_executed,
        regressionData.P3.Not_executed, regressionData.P4.Not_executed, regressionData.P5.Not_executed
        ];
        this.passedRelease = productReleasePassData.reduce((prev, curr) => prev + curr);
        this.failedRelease = productReleaseFailData.reduce((prev, curr) => prev + curr);
        const productReleaseDataset = [{
          label: 'Failed',
          data: productReleaseFailData,
          backgroundColor: '#556080',
          hoverBackgroundColor: '#556080'
        },
        {
          label: 'Passed',
          data: productReleasePassData,
          backgroundColor: '#74a9cd',
          hoverBackgroundColor: '#74a9cd'
        },
        {
          label: 'Total',
          type: 'roundedBar',
          data: productReleaseNEData,
          backgroundColor: '#e4eef0',
          hoverBackgroundColor: '#e4eef0'
        }];

        const tooltip = {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataSet) {
              switch (item.datasetIndex) {
                case 1: {
                  return 'Passed : ' + item.yLabel;
                }
                case 0: {
                  return 'Failed : ' + item.yLabel;
                }
                case 2: {
                  return 'Not Executed : ' + item.yLabel;
                }
              }
            },
            labelColor: function (tooltipItem, chart) {
              switch (tooltipItem.datasetIndex) {
                case 0: {
                  return {
                    backgroundColor: '#556080'
                  };
                }
                case 1: {
                  return {
                    backgroundColor: '#74a9cd'
                  };
                }
                case 2: {
                  return {
                    backgroundColor: '#e4eef0'
                  };
                }
              }
            },
          }
        };
        this.productionRelease = this.globalService.makeStackBarChart(
          'productSummary', productReleaseLabels, productReleaseDataset, 'Priority', 'Frequency', tooltip
        );

        const regressionFailureLabels = [
          'Very High Priority',
          'High Priority',
          'Medium Priority',
          'Less Priority',
          'Low Priority'
        ];
        const regressionFailureData = Object.values(regressionData.Failure);
        const failureDataset = [
          {
            data: regressionFailureData,
            label: 'Label 1',
            backgroundColor: ['#556080', '#6090a8', '#74a9cd', '#bbcfda', '#e4eef0']
          }
        ];
        this.regressionSummary = this.globalService.makePieGraph(
          'regressionSummary', regressionFailureLabels, failureDataset
        );
      },
      error => {
        console.log('error=' + JSON.stringify(error));
      }
    );
  }

  public getSprintTesting() {
    this.overviewService.getSprintFeature('Unigy', 'U_C_P_2.0').subscribe(
      data => {
        console.log('sprint data-' + JSON.stringify(data));
        const featureTestingLabels = Object.keys(data.Sprint_feat_test);
        const featureTestingPassData = Object.values(data.Sprint_feat_test).map(item => item['pass']);
        const featureTestingFailData = Object.values(data.Sprint_feat_test).map(item => item['fail']);
        this.passedSprint = featureTestingPassData.reduce((prev, curr) => prev + curr);
        this.failedSprint = featureTestingFailData.reduce((prev, curr) => prev + curr);

        const featureTestingDataset = [
          {
            data: featureTestingPassData,
            type: 'bar',
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 2
          },
          {
            data: featureTestingFailData,
            type: 'bar',
            backgroundColor: '#556080',
            hoverBackgroundColor: '#556080',
            borderWidth: 2
          }
        ];
        this.sprintFailure = this.globalService.makeStackedBarChart(
          'sprintFailure', featureTestingLabels, featureTestingDataset, 20, 100, '%', 'Sprints', 'Frequency'
        );

        const sprintSummaryLabels = ['P1', 'P2', 'P3', 'P4', 'P5'];
        // const sprintSummaryLineData = data.Sprint_Summary.Dot.map(item => (item/(+this.failedSprint))*100);
        const tempData = data.Sprint_Summary.Dot.map(item => item);
        const sprintSummaryLineData = [ 
          (tempData.slice(0,1).reduce((acc, curr) => acc + curr)/+this.failedSprint) * 100,
          (tempData.slice(0,2).reduce((acc, curr) => acc + curr)/+this.failedSprint) * 100,
          (tempData.slice(0,3).reduce((acc, curr) => acc + curr)/+this.failedSprint) * 100,
          (tempData.slice(0,4).reduce((acc, curr) => acc + curr)/+this.failedSprint) * 100,
          (tempData.slice(0,5).reduce((acc, curr) => acc + curr)/+this.failedSprint) * 100
        ].map(item => item.toPrecision(2));
        const sprintSummaryBarData = data.Sprint_Summary.bar.map(item => item);
        const sprintSummaryDataset = [
          {
            data: sprintSummaryBarData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 2,
            yAxisID: 'bar'
          },
          {
            data: sprintSummaryLineData,
            type: 'line',
            yAxisID: 'line'
          }
        ];
        const scales = {
          yAxes: [{
            id: 'bar',
            position: 'left',
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Frequency'
            },
            gridLines: {
              drawOnChartArea: false
            }
          },
          {
            id: 'line',
            position: 'right',
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Cumulative Failures'
            },
            gridLines: {
              drawOnChartArea: false
            }
          }
          ],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            barPercentage: 0.2,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        };

        const tooltip = {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataSet) {
              switch (item.datasetIndex) {
                case 0: {
                  return 'Passed : ' + item.yLabel;
                }
                case 1: {
                  return 'Failed : ' + item.yLabel;
                }
                case 2: {
                  return 'Not Executed : ' + item.yLabel;
                }
              }
            },
            labelColor: function (tooltipItem, chart) {
              switch (tooltipItem.datasetIndex) {
                case 0: {
                  return {
                    backgroundColor: '#74a9cd'
                  };
                }
                case 1: {
                  return {
                    backgroundColor: '#556080'
                  };
                }
                case 2: {
                  return {
                    backgroundColor: '#e4eef0'
                  };
                }
              }
            },
          }
        };
        this.sprintSummary = this.globalService.makeBarGraph(
          'sprintSummary', sprintSummaryLabels, sprintSummaryDataset, scales);
      },
      error => {
        console.log('error-' + JSON.stringify(error));
      }
    );
  }
}
