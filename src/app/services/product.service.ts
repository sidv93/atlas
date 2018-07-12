import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

@Injectable()
export class ProductService {

  private headers;
  private searchParams: URLSearchParams;

  constructor(private globalService: GlobalService, private configuration: Configuration, private http: Http) {
    this.headers = new Headers();
  }

  public getProductList() {
    return this.http.get(this.globalService.baseUrl +
      this.configuration.productListUrl, { headers: this.headers })
      .map((res: Response) => res.json());
  }

  public getProjectsList(id: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('id', id);

    return this.http.get(this.globalService.baseUrl +
      this.configuration.projectListUrl, { headers: this.headers, search: this.searchParams })
      .map((res: Response) => res.json());
  }

  public getProjectSummary(id: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('id', id);
    return this.http.get(this.globalService.baseUrl +
      this.configuration.projectSummaryUrl, { headers: this.headers, search: this.searchParams })
      .map((res: Response) => res.json());
  }
}
