import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class DateFeatureService {

  private headers: Headers;
  private searchParams: URLSearchParams;
  constructor(private http: Http, private configuration: Configuration,
    private globalService: GlobalService) {
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
  }

  public getFeatureAnalysis(pipeline: string, project: string, release: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('pipeline', pipeline);
    this.searchParams.set('project', project);
    this.searchParams.set('release', release);
    return Observable.of(
      {
        'numericalfields': [{
          'type': 'age',
          'min': '1',
          'max': '23',
          'mean': '12',
          'firstQuartile': '4',
          'secondQuartile': '4',
          'nullcounts': '10'
        }, {
          'type': 'weight',
          'min': '1',
          'max': '23',
          'mean': '12',
          'firstQuartile': '4',
          'secondQuartile': '4',
          'nullcounts': '10'
        }, {
          'type': 'height',
          'min': '1',
          'max': '23',
          'mean': '12',
          'firstQuartile': '4',
          'secondQuartile': '4',
          'nullcounts': '10'
        }],
        'categoricalfields': [{
          'type': 'gender',
          'typesAndCounts': 'Male:213141;Female:21343241',
          'totalCount': '131431',
          'nullcounts': '10'
        }, {
          'type': 'timeOfDay',
          'typesAndCounts': 'Morning:21341; Evening:21343241;Night:3211',
          'totalCount': '1232143214',
          'nullcounts': '10'
        }],
        'texttualfields': [{
          'type': 'description',
          'totalwords': '1412321',
          'top5Words': 'bug, fix, exception, node, class',
          'nullcounts': '10'
        }]
      });
    // return this.http.get(this.globalService.baseUrl + this.configuration.featureAnalysisUrl, {
    //   headers: this.headers,
    //   search: this.searchParams
    // }).map((res: Response) => res.json());
  }
}
