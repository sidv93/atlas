import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OverviewService } from '../../../services/overview.service';
import { Configuration } from '../../../app.constants';
import * as moment from 'moment';
import { GlobalService } from '../../../global.service';
import { ProductService } from '../../../services/product.service';
import { ProjectList } from './project-model';

@Component({
  selector: 'app-right-pane',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public barChart = [];
  public horizontalBarChart = [];
  public doughnutCircle = [];
  public stackedBar;
  public flag = true;
  public clean = 0;
  public buggy = 0;
  public noRecords = false;
  public today;
  public productData;
  public currentPage = 1;
  public loading = false;
  public project;
  public projects;
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  @ViewChild('bar') verticalBar: ElementRef;
  @ViewChild('horizontalBar') horizontalBar: ElementRef;
  @ViewChild('doughnut') doughnutChart: ElementRef;
  @ViewChild('doughnutCircle') doughnutCircleObj: ElementRef;
  @ViewChild('stackbar') stackedBarChart: ElementRef;
  constructor(private overviewService: OverviewService, public configuration: Configuration,
    public globalService: GlobalService, private productService: ProductService) {
    this.globalService.changeProduct$.subscribe(
      data => {
        this.getProjects();
      }
    );
    this.globalService.productsFetched$.subscribe(
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
        this.getProjectsDetails();
        this.getModifiedAndCommits();
        const thisDay = new Date();
        this.today = thisDay.getFullYear() + '-' + (thisDay.getMonth() + 1) + '-' + thisDay.getDate();
        const week = moment().subtract(6, 'month');
        const endDate = week.get('year') + '-' + (week.get('month') + 1) + '-' + week.get('date');
        this.getProjectSummary(endDate, this.today, '6 Months');
      },
      error => {
        console.log('error-' + JSON.stringify(error));
      }
    );
  }
  public getModifiedAndCommits() {
    this.overviewService.getOverviewData(this.project.projectId).subscribe(
      data => {
        this.clean = Math.floor((data.overview.prediction.clean / data.overview.prediction.total) * 100);
        this.buggy = Math.floor((data.overview.prediction.buggy / data.overview.prediction.total) * 100);
        const datas = [data.overview.prediction.clean, data.overview.prediction.buggy];
        const dataSetDoughnut = [
          {
            data: datas,
            label: 'Label 1',
            backgroundColor: ['#74a9cd', '#a7c6db']
          }
        ];
        this.doughnutCircle = this.globalService.makeDoughnutGraph('doughnutCircle', dataSetDoughnut);
        const authorData = data.overview.authorcommits.slice(0, 5);
        const authData = authorData.map(item => item.commits);
        const authLabels = authorData.map(item => item.author_name);
        const dataset = [
          {
            data: authData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 1
          }
        ];
        this.horizontalBarChart = this.globalService.makeHorizontalBarGraph('barcharthorizontal', authLabels, dataset);

        const fileData = data.overview.top5Files.modified.map(item => item.count);
        const fileNames = data.overview.top5Files.modified.map(item => item.name);
        const fileLabels = data.overview.top5Files.modified.map(item => item.name.slice(0, 5));
        const dataSet = [
          {
            data: fileData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
          }
        ];
        this.barChart = this.globalService.filesModifiedGraph('barchartvertical', fileLabels, dataSet, fileNames);
      },
      error => {
        console.log('error=' + JSON.stringify(error));
      }
    );
  }

  public getProjectSummary(startDate: string, endDate: string, filter: string) {
    console.log('id- ' + this.project.projectId);
    this.overviewService.getProjectSummary(this.project.projectId, startDate, endDate).subscribe(
      data => {
        if (data.results.length > 0) {
          this.noRecords = false;
          let cleanData = [], buggyData = [], labels = [];
          switch (filter) {
            case '1 Year': {
              const dateObj = new Date(startDate);
              for (let i = dateObj.getMonth(); i < 12; i++) {
                labels.push(this.months[i]);
              }
              for (let i = 0; i < dateObj.getMonth() + 1; i++) {
                labels.push(this.months[i]);
              }
              for (let i = 0; i < 13; i++) {
                cleanData[i] = buggyData[i] = 0;
              }
              data.results.forEach(item => {
                const dateLocal = new Date(item.date);
                if (dateLocal.getMonth() === new Date().getMonth()) {
                  if (dateLocal.getFullYear() < new Date().getFullYear()) {
                    cleanData[0] += item.predictedClean;
                    buggyData[0] += item.predictedBugs;
                  } else {
                    cleanData[12] += item.predictedClean;
                    buggyData[12] += item.predictedBugs;
                  }
                } else {
                  cleanData[labels.findIndex(label => dateLocal.toLocaleString('en-us', { month: 'long' }) === label)]
                    += item.predictedClean;
                  buggyData[labels.findIndex(label => dateLocal.toLocaleString('en-us', { month: 'long' }) === label)]
                    += item.predictedBugs;
                }
              });
              break;
            }

            case '6 Months': {
              const dateObj = new Date(startDate);
              if ((dateObj.getMonth() + 6) < 12) {
                for (let i = dateObj.getMonth(); i < (dateObj.getMonth() + 6); i++) {
                  labels.push(this.months[i]);
                }
              } else {
                for (let i = dateObj.getMonth(); i < 12; i++) {
                  labels.push(this.months[i]);
                }
                const len = labels.length;
                for (let i = 0; i <= 6 - len; i++) {
                  labels.push(this.months[i]);
                }
              }
              for (let i = 0; i < 7; i++) {
                cleanData[i] = buggyData[i] = 0;
              }
              data.results.forEach(item => {
                const dateLocal = new Date(item.date);
                cleanData[labels.findIndex(label => dateLocal.toLocaleString('en-us', { month: 'long' }) === label)] += item.predictedClean;
                buggyData[labels.findIndex(label => dateLocal.toLocaleString('en-us', { month: 'long' }) === label)] += item.predictedBugs;
              });
              break;
            }

            case '1 Month': {
              const dateObj = new Date(startDate);
              for (let i = 0; i <= 30 - dateObj.getDate(); i++) {
                labels.push(dateObj.getDate() + i);
              }
              const len = labels.length;
              for (let i = 0; i < 30 - len; i++) {
                labels.push(i + 1);
              }
              cleanData = buggyData = Array(31).fill(0);
              data.results.forEach(item => {
                const dateLocal = new Date(item.date);
                const index = labels.findIndex(label => dateLocal.getDate() === label);
                cleanData[index] += item.predictedClean;
                buggyData[index] += item.predictedBugs;
              });
              break;
            }

            case '1 Week': {
              const dateObj = new Date(startDate);
              for (let i = dateObj.getDate(); i <= 7 && i <= 30; i++) {
                labels.push(i);
              }
              const len = labels.length;
              for (let i = len; i <= 7; i++) {
                labels.push(dateObj.getDate() + i);
              }
              for (let i = 0; i < 8; i++) {
                cleanData[i] = buggyData[i] = 0;
              }
              data.results.forEach(item => {
                const dateLocal = new Date(item.date);
                cleanData[labels.findIndex(label => dateLocal.getDate() === label)] += item.predictedClean;
                buggyData[labels.findIndex(label => dateLocal.getDate() === label)] += item.predictedBugs;
              });
              break;
            }

            case '1 Day': {
              labels = Array(24).fill(0).map((e, i) => i);
              for (let i = 0; i < 24; i++) {
                cleanData[i] = buggyData[i] = 0;
              }
              data.results.forEach(item => {
                const dateLocal = new Date(item.date);
                cleanData[labels.findIndex(label => dateLocal.getHours() === label)] += item.predictedClean;
                buggyData[labels.findIndex(label => dateLocal.getHours() === label)] += item.predictedBugs;
              });
              break;
            }
          }
          if (!this.stackedBar) {
            const dataset = [{
              label: 'Clean',
              data: cleanData,
              backgroundColor: '#74a9cd'
            }, {
              // type: 'roundedBar',
              label: 'Buggy',
              data: buggyData,
              backgroundColor: '#a7c6db'
            }
            ];
            const tooltip = {
              callbacks: {
                title: function (item) {
                  return null;
                },
                label: function (item, dataSet) {
                  return (item.datasetIndex === 0 ? 'Clean' : 'Buggy') + ' : ' + item.yLabel;
                },
                labelColor: function (tooltipItem, chart) {
                  return {
                    backgroundColor: (tooltipItem.datasetIndex === 0 ? '#74a9cd' : '#bedcf0')
                  };
                },
              }
            };
            this.stackedBar = this.globalService.makeStackBarChart(this.stackedBarChart.nativeElement,
              labels, dataset, '', '', tooltip);
          } else {
            this.stackedBar.data.datasets[0].data = cleanData;
            this.stackedBar.data.datasets[1].data = buggyData;
            this.stackedBar.data.labels = labels;
            this.stackedBar.update();
          }
        } else {
          this.noRecords = true;
        }

      },
      error => {
        this.noRecords = true;
        console.log('error = ' + JSON.stringify(error));
      }
    );
  }

  public dateFilter(date: string) {
    switch (date) {
      case '1 Day': {
        this.getProjectSummary(this.today, this.today, date);
        break;
      }
      case '1 Week': {
        const week = moment().subtract(7, 'days');
        const endDate = week.get('year') + '-' + (week.get('month') + 1) + '-' + week.get('date');
        this.getProjectSummary(endDate, this.today, date);
        break;
      }
      case '1 Month': {
        const week = moment().subtract(1, 'month');
        const endDate = week.get('year') + '-' + (week.get('month') + 1) + '-' + week.get('date');
        this.getProjectSummary(endDate, this.today, date);
        break;
      }
      case '6 Months': {
        const week = moment().subtract(6, 'month');
        const endDate = week.get('year') + '-' + (week.get('month') + 1) + '-' + week.get('date');
        this.getProjectSummary(endDate, this.today, date);
        break;
      }
      case '1 Year': {
        const week = moment().subtract(1, 'year');
        const endDate = week.get('year') + '-' + (week.get('month') + 1) + '-' + week.get('date');
        this.getProjectSummary(endDate, this.today, date);
        break;
      }
      default: {

      }
    }
  }

  public getProjectsDetails() {
    this.loading = true;
    this.productService.getProjectSummary(this.globalService.product.productID).subscribe(
      data => {
        this.productData = data.result;
        this.productData.projectList.forEach(item => {
          const project = new ProjectList();
          item.timeseriesCheckinAndPred.forEach(checkin => {
            switch (checkin.type) {
              case '1d': {
                project.checkins1d = checkin.totalCheckins;
                project.percent1d = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              case '7d': {
                project.checkins1w = checkin.totalCheckins;
                project.percent1w = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              case '1m': {
                project.checkins1m = checkin.totalCheckins;
                project.percent1m = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              case '6m': {
                project.checkins6m = checkin.totalCheckins;
                project.percent6m = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              case '1y': {
                project.checkins1y = checkin.totalCheckins;
                project.percent1y = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              case 'All': {
                project.checkinsAll = checkin.totalCheckins;
                project.percentAll = (+checkin.bugsPredicted / +checkin.totalCheckins) * 100;
                break;
              }
              default: {

              }
            }
          });
          item.projects = project;
        });
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log('error=' + JSON.stringify(error));
      }
    );
  }

  public changeProject() {
    console.log('pro=' + JSON.stringify(this.project));
    this.getModifiedAndCommits();
    // this.getProjectSummary();
  }
}
