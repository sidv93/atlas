import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { DefectPredictionService } from '../../../services/defect-prediction.service';
import { GlobalService } from '../../../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { DeployService } from '../deploy.service';


@Component({
  selector: 'app-defect-prediction',
  templateUrl: './defect-prediction.component.html',
  styleUrls: ['./defect-prediction.component.css']
})
export class DefectPredictionComponent implements OnInit {

  public defectPredictionData: any[];
  public topLevel = [];
  public authors = [];
  public searchForm: FormGroup;
  public predictions = ['Clean', 'Buggy', 'All'];
  public searchInput: any;
  public loading = false;
  public pageSize = 5;
  public currentPage = 1;
  public commitSort = true;
  public authorSort = true;
  public predictionSort = true;
  public expanded = false;
  public project;
  public projects;
  constructor(private defectPredictionService: DefectPredictionService, private formBuilder: FormBuilder,
    public globalService: GlobalService, private router: Router, private route: ActivatedRoute,
    private productService: ProductService,
    private deploySerice: DeployService) {
    this.searchForm = formBuilder.group({
      'search': ['', Validators.required]
    });

    this.searchForm.controls.search.valueChanges.debounceTime(500)
      .map((value) => {
        if (value === '') {
          this.getPredictionData();
        } else {
          this.loading = true;
          this.topLevel = [];
          if (isNaN(+value)) {
            this.topLevel = this.defectPredictionData.filter(item => item.file === value);
          } else {
            this.topLevel = this.defectPredictionData.filter((item) => item.commitid === (+value));
          }
          this.topLevel.forEach(item => item.more = 'none');
          this.loading = false;
        }
      }).subscribe();

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
        this.getPredictionData();
      },
      error => {
        console.log('error-' + JSON.stringify(error));
      }
    );
  }

  public getPredictionData() {
    this.loading = true;
    this.topLevel = [];
    this.authors = [];
    this.defectPredictionService.getPredictionData(this.project.projectId).subscribe(
      (data) => {
        this.defectPredictionData = data.result.predictionListing.details;
        this.deploySerice.predictionData = this.defectPredictionData;
        this.defectPredictionData.forEach(item => {
          if (this.uniqueCheck(item)) {
            if (this.defectPredictionData.filter((element) => element.commitid === item.commitid).length > 1) {
              item.more = 'expand';
            } else {
              item.more = 'none';
            }
            this.topLevel.push(item);
            this.authors.push(item.author);
          }
        });
        this.authors.push('All');
        this.authors = this.authors.filter((item, index, self) => index === self.findIndex(t => t === item));
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log('Error=' + JSON.stringify(error));
      }
    );
  }

  public expand(commitid: string) {
    const index = this.topLevel.findIndex(item => item.commitid === commitid);
    this.topLevel[index].more = 'expanded';
    const toPush = this.defectPredictionData.filter(item => item.commitid === commitid).slice(1);
    toPush.forEach(item => {
      item.more = '';
      this.topLevel.splice(index + 1, 0, item);
    });
  }

  public contract(defect: any) {
    const startIndex = this.topLevel.findIndex(item => item === defect);
    let endIndex;
    endIndex = this.topLevel.filter(item => item.commitid === defect.commitid).length;
    this.topLevel.splice(startIndex + 1, endIndex - 1);
    this.topLevel[startIndex].more = 'expand';
  }

  public expandAll() {
    this.loading = true;
    let commitids = [];
    commitids = this.defectPredictionData.map(item => item.commitid)
      .filter((defect, index, self) => index === self.findIndex(t => t === defect));
    this.topLevel = [];
    let toPush = [];
    commitids.forEach((item, index) => {
      toPush = this.defectPredictionData.filter(defect => defect.commitid === item);
      toPush.length > 1 ? toPush[0].more = 'expanded' : toPush[0].more = 'none';
      toPush.forEach(push => this.topLevel.push(push));
    });
    this.loading = false;
  }

  public contractAll() {
    this.getPredictionData();
  }

  public sortByAuthor(author?: string) {
    if (author) {
      if (author === 'All') {
        this.getPredictionData();
      } else {
        this.topLevel = this.defectPredictionData.filter((item) => item.author === author);
        this.topLevel.forEach(item => {
          item.more = '';
        });
      }
    } else {
      if (this.authorSort) {
        this.topLevel = this.topLevel.sort((a, b) => a.author - b.author);
      } else {
        this.topLevel = this.topLevel.sort((a, b) => b.author - a.author);
      }
      this.authorSort = !this.authorSort;
    }
  }

  public sortByPrediction(prediction?: string) {
    if (prediction) {
      if (prediction === 'All') {
        this.getPredictionData();
      } else {
        this.topLevel = this.defectPredictionData.filter((item) => item.prediction === prediction);
        this.topLevel.forEach(item => {
          item.more = '';
        });
      }
    } else {
      if (this.predictionSort) {
        this.topLevel = this.topLevel.filter(item => item.prediction === 'Clean');
      } else {
        this.topLevel = this.topLevel.filter(item => item.prediction === 'Buggy');
      }
      this.predictionSort = !this.predictionSort;
    }
  }

  public openFileHistory(file: string) {
    const files = this.defectPredictionData.filter(item => item.file === file);
    this.deploySerice.setFileHistoryData(files);
    this.globalService.project = this.project;
    this.deploySerice.fromDefect = true;
    this.globalService.tabSwitch$.next('file-history');
    this.router.navigate(['../file-history'], { relativeTo: this.route });
  }

  public uniqueCheck(item: any) {
    return this.topLevel.filter((el) => item.commitid === el.commitid).length === 0;
  }

  public commitTimeSort() {
    if (this.commitSort) {
      this.topLevel = this.topLevel.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
    } else {
      this.topLevel = this.topLevel.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }
    this.commitSort = !this.commitSort;
  }

  public onRightClick() {
    console.log('right clicked');
    return false;
  }

  public changeProject() {
    console.log('project-' + JSON.stringify(this.project));
    this.getPredictionData();
  }
}
