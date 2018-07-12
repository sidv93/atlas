import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import { Configuration } from '../../app.constants';

@Injectable()
export class OptimiseService {

  private headers: Headers;
  private searchParams: URLSearchParams;
  constructor(private http: Http, private globalService: GlobalService, private configuration: Configuration) { }

  public getProgressionData(product: string, release: string, feature: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('product', product);
    this.searchParams.set('release', release);
    this.searchParams.set('feature', feature);
    return this.http.get('http://localhost:5000' + this.configuration.progressionUrl,
      {
        headers: this.headers,
        search: this.searchParams
      }
    ).map((res: Response) => res.json());
  }

  public getRegressionData(product: string, release: string, feature: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('product', product);
    this.searchParams.set('release', release);
    this.searchParams.set('feature', feature);
    return this.http.get('http://localhost:5000' + this.configuration.regressionOptimiseUrl,
      {
        headers: this.headers,
        search: this.searchParams
      }
    ).map((res: Response) => res.json());
  }
}
