import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';

@Injectable()
export class OverviewService {

  private searchParams: URLSearchParams;
  private headers: Headers;
  private count = 1;
  constructor(private http: Http, private globalService: GlobalService, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
  }

  public getOverviewData(projectid: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('projectid', projectid);
    return this.http.get(this.globalService.baseUrl + this.configuration.overviewUrl,
      {
        headers: this.headers,
        search: this.searchParams
      }).map((res: Response) => res.json());
  }

  public getProjectSummary(projectID: string, startDate: string, endDate: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('projectid', projectID);
    this.searchParams.set('startdate', startDate);
    this.searchParams.set('enddate', endDate);
    return this.http.get(this.globalService.baseUrl + this.configuration.projectSummaryChartUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }

  public getRegressionData(product: string, release: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('product', product);
    this.searchParams.set('release', release);
    return this.http.get(this.globalService.baseUrl + this.configuration.regressionUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }

  public getSprintFeature(product: string, release: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('product', product);
    this.searchParams.set('release', release);
    return this.http.get(this.globalService.baseUrl + this.configuration.sprintFeatureUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());

  }
}
