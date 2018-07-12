import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ExecutionResultService } from '../../../services/execution-result.service';
import { GlobalService } from '../../../global.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-execution-results',
  templateUrl: './execution-results.component.html',
  styleUrls: ['./execution-results.component.css']
})
export class ExecutionResultsComponent implements OnInit, AfterViewInit {

  public ERDetails;
  public rankPriority;
  public loading = false;
  public searchForm: FormGroup;
  public currentPage = 1;
  public tablePriority = 'All';
  public rank_bkp;
  public rankSorted = false;
  constructor(private globalService: GlobalService, private executionResults: ExecutionResultService,
    private formBuilder: FormBuilder) {

    this.globalService.changeProduct$.subscribe(
      data => {
        this.getERData();
      }
    );

    this.searchForm = formBuilder.group({
      'search': ['', Validators.required]
    });
    this.searchForm.controls.search.valueChanges.debounceTime(500).map(
      data => {
        if (data === '') {
          this.rankPriority = [...this.rank_bkp];
        } else {
          this.rankPriority = this.rank_bkp.filter(item => data === item.testCaseID);
        }
      }
    ).subscribe();
  }

  ngOnInit() {
    this.getERData();
  }

  ngAfterViewInit() {
    const apfd = +this.ERDetails.APFDValue;
    if (apfd >= 0 && apfd < 0.1) {
      document.getElementById('apfd-value').style.marginLeft = -10 + '%';
    } else if (apfd >= 0.1 && apfd < 0.2) {
      document.getElementById('apfd-value').style.marginLeft = 0 + '%';
    } else if (apfd >= 0.2 && apfd < 0.3) {
      document.getElementById('apfd-value').style.marginLeft = 10 + '%';
    } else if (apfd >= 0.3 && apfd < 0.4) {
      document.getElementById('apfd-value').style.marginLeft = 20 + '%';
    } else if (apfd >= 0.4 && apfd < 0.5) {
      document.getElementById('apfd-value').style.marginLeft = 30 + '%';
    } else if (apfd >= 0.5 && apfd < 0.6) {
      document.getElementById('apfd-value').style.marginLeft = 40 + '%';
    } else if (apfd >= 0.6 && apfd < 0.7) {
      document.getElementById('apfd-value').style.marginLeft = 50 + '%';
    } else if (apfd >= 0.7 && apfd < 0.8) {
      document.getElementById('apfd-value').style.marginLeft = 60 + '%';
    } else if (apfd >= 0.8 && apfd < 0.9) {
      document.getElementById('apfd-value').style.marginLeft = 70 + '%';
    } else if (apfd >= 0.9 && apfd < 1.0) {
      document.getElementById('apfd-value').style.marginLeft = 80 + '%';
    }

    let sum = +this.ERDetails.totalFailedTests;
    console.log('sum-' + sum);
    document.getElementById('p1').style.width = ((+(this.ERDetails.p1Values) / sum) * 100).toPrecision(2) + '%';
    document.getElementById('p2').style.width = ((+(this.ERDetails.p2Values) / sum) * 100).toPrecision(2) + '%';
    document.getElementById('p3').style.width = ((+(this.ERDetails.p3Values) / sum) * 100).toPrecision(2) + '%';
    document.getElementById('p4').style.width = ((+(this.ERDetails.p4Values) / sum) * 100).toPrecision(2) + '%';
    document.getElementById('p5').style.width = ((+(this.ERDetails.p5Values) / sum) * 100).toPrecision(2) + '%';
  }

  public getERData() {
    this.loading = true;
    this.executionResults.getExceutionResultData('', '', '').subscribe(
      data => {
        this.ERDetails = data.tcpdeploy.level1;
        this.rank_bkp = data.tcpdeploy.level2;
        document.getElementById('progress').style.width = this.ERDetails.regressionTestingProcess[0] + '%';
        this.rankPriority = data.tcpdeploy.level2;
        this.loading = false;

      }, error => {
        this.loading = false;
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

  public changePriority() {
    this.loading = true;
    this.rankPriority = this.tablePriority === 'All' ? [...this.rank_bkp] :
      this.rank_bkp.filter(item => item.priorityGroup === this.tablePriority);
    this.loading = false;
  }

  public rankSort() {
    if (this.rankSorted) {
      this.rankPriority = this.rank_bkp.sort( (a, b) => +a.rank - +b.rank);
    } else {
      this.rankPriority = this.rank_bkp.sort( (a, b) => +b.rank - +a.rank);
    }
    this.rankSorted = !this.rankSorted;
  }
}
