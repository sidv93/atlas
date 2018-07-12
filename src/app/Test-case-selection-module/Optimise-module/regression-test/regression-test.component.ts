import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { OptimiseService } from '../optimise.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regression-test',
  templateUrl: './regression-test.component.html',
  styleUrls: ['./regression-test.component.css']
})
export class RegressionTestComponent implements OnInit {

  public regressionChart;
  public loading = false;
  public currentPage = 1;
  public searchForm: FormGroup;
  public graphExecutionTime;
  public tableExecutionTime;
  public graphData;
  public tableData;
  public tableEntries;
  private totalTime;
  public timeLimits;
  public selectedTestCases = [];
  public rangePriority = 5;
  public tablePriority = 'All';
  public graphPriority = 'All';
  @ViewChild('range') rangeValue: ElementRef;

  constructor(private globalService: GlobalService, private optimiseService: OptimiseService,
    private formBuilder: FormBuilder) {
    this.globalService.productsFetched$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
    this.globalService.changeProduct$.subscribe(
      data => {
        this.ngOnInit();
      }
    );
    this.searchForm = formBuilder.group({
      'search': ['', Validators.required]
    });
    this.searchForm.controls.search.valueChanges.debounceTime(500).map(
      data => {
        if (data === '') {
          this.tableData = this.tableEntries;
        } else {
          this.tableData = this.tableEntries.filter(item => item.tc_id === data);
        }
      }
    ).subscribe();
  }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.getRegressionData();
    }
  }

  public getRegressionData() {
    this.loading = true;
    this.optimiseService.getRegressionData('Unigy', 'U_C_P_2.0', 'Callprocessing').subscribe(
      data => {
        this.graphData = data.Graph;
        this.tableData = data.Table;
        this.tableEntries = data.Table;
        this.selectedTestCases = this.tableData;
        const graphLabels = this.graphData.map(item => item.tc_id);
        const graphData = this.graphData.map(item => item.score);
        const execTime = this.graphData.map(item => item.execution_time).reduce((prev, curr) => prev + curr);
        this.totalTime = execTime;
        this.graphExecutionTime = this.secondsToHms(execTime);
        const hours = Math.floor(execTime / 3600);
        this.timeLimits = Array.from(Array(hours + 1).keys()).filter(item => item !== 0);
        const backgroundColor = this.getBackgroundColor(this.graphData);
        const dataset = [
          {
            data: graphData,
            backgroundColor: backgroundColor,
            hoverBackgroundColor: backgroundColor
          }
        ];
        this.regressionChart = this.globalService.makeProgressionGraph('regressionChart', graphLabels, dataset);
        this.loading = false;
      },
      error => {
        console.log('error=' + JSON.stringify(error));
        this.loading = false;
      }
    );
  }

  public changePriority() {
    this.loading = true;
    this.tableData = this.tablePriority === 'All' ? this.tableEntries :
      this.tableEntries.filter(item => item.priority_group === this.tablePriority);
    this.loading = false;
  }

  public graphPriorityFilter() {
    const pGraphData = this.graphPriority !== 'All' ? this.graphData.filter(item => item.priority === this.graphPriority) : this.graphData;
    const graphData = pGraphData.map(item => item.score);
    const graphLabels = pGraphData.map(item => item.tc_id);
    this.regressionChart.data.datasets[0].data = graphData;
    this.regressionChart.data.labels = graphLabels;
    this.regressionChart.update();
    const execTime = pGraphData.map(item => item.execution_time).reduce((prev, curr) => prev + curr);
    this.graphExecutionTime = this.secondsToHms(execTime);
    this.rangeValue.nativeElement.value = 100;
  }

  public rangeChange(value: any) {
    this.graphPriority = 'All';
    const newSec = Math.round((value / 100) * this.totalTime);
    this.graphExecutionTime = this.secondsToHms(newSec);
    let second = 0;
    const newGraph = [];
    this.graphData.forEach((item, index) => {
      if ((second + item.execution_time) <= newSec) {
        second += item.execution_time;
        newGraph.push(item);
      }
    });
    this.selectedTestCases = [...newGraph];
    second = 0;
    this.tableData = [];
    this.tableEntries.forEach((item, index) => {
      if ((second + item.execution_time) <= newSec) {
        second += item.execution_time;
        this.tableData.push(item);
      }
    });
    const range = newGraph[newGraph.length - 1].priority;
    this.rangePriority = range.slice(range.length - 1);
    const graphData = newGraph.map(item => item.score);
    const graphLabels = newGraph.map(item => item.tc_id);
    this.regressionChart.data.datasets[0].data = graphData;
    this.regressionChart.data.labels = graphLabels;
    this.regressionChart.update();
  }

  public tableTimeFilter() {
    if (this.tableExecutionTime !== 'All') {
      const seconds = this.tableExecutionTime * 3600;
      let second = 0, i = 0;
      this.tableData = [];
      while (second <= seconds) {
        this.tableData.push(this.tableEntries[i]);
        second += this.tableEntries[i].execution_time;
        i++;
      }
    } else {
      this.tableData = [...this.tableEntries];
    }
  }

  private secondsToHms(seconds: number) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes') : '';
    return hDisplay + mDisplay;
  }

  private getBackgroundColor(graphData) {
    let count = graphData.filter(item => item.priority === 'P1').length;
    let backgroundColor = new Array(count).fill('#449bd7');
    count = graphData.filter(item => item.priority === 'P2').length;
    backgroundColor.push(...new Array(count).fill('#7bbdf7'));
    count = graphData.filter(item => item.priority === 'P3').length;
    backgroundColor.push(...new Array(count).fill('#5a91b6'));
    count = graphData.filter(item => item.priority === 'P4').length;
    backgroundColor.push(...new Array(count).fill('#daefff'));
    count = graphData.filter(item => item.priority === 'P5').length;
    backgroundColor.push(...new Array(count).fill('#0c4f76'));
    return backgroundColor;
  }
  
  public promote() {
    console.log('select-' + JSON.stringify(this.selectedTestCases));
    const testCases = {
      "testCases": this.selectedTestCases.map(item => item.tc_id)
    };

    //API for posting
  }
}
