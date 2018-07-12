import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';


@Injectable()
export class ExecutionResultService {

  private headers: Headers;
  private urlParams: URLSearchParams;
  constructor(private http: Http, private globalService: GlobalService, private config: Configuration) {
    this.headers = new Headers();
    this.headers.set('Accept', 'Application/json');
  }

  public getExceutionResultData(pipeline: string, project: string, release: string) {
    this.urlParams = new URLSearchParams();

    return this.http.get(this.globalService.baseUrl + this.config.executionResultsURL + '?productid=Unigy&release=U_C_P_2.0&feature=Call%20processing', {
      headers: this.headers, search: this.urlParams
    }).map((res: Response) => res.json());
  }

}
