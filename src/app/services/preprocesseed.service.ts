import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class PreprocesseedService {

  private headers: Headers;
  private searchParams: URLSearchParams;

  constructor(private http: Http, private configuration: Configuration,
    private globalService: GlobalService) {
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
  }

  public getMetricsData(pipeline: string, project: string) {
    return Observable.of(
      {
        'wordFrequency': '321981',
        'noOfRecords': '9872883',
        'dataSize': '10GB',
        'noOfFeatures': '122'
      }
    );
  }

  public getChartData(pipeline: string, project: string) {
    // return Observable.of({
    //   'histogram': {
    //     'features': [{
    //       'name': 'Feature1',
    //       'words': [{
    //         'key': 'Camel',
    //         'frequency': '112'
    //       }, {
    //         'key': 'Nodal',
    //         'frequency': '55'
    //       }, {
    //         'key': 'connect',
    //         'frequency': '12'
    //       }]
    //     },
    //     {
    //       'name': 'Feature2',
    //       'words': [{
    //         'key': 'Nest',
    //         'frequency': '443'
    //       }, {
    //         'key': 'Cokkoo',
    //         'frequency': '234'
    //       }, {
    //         'key': 'Baseball',
    //         'frequency': '64'
    //       }]
    //     }
    //     ]
    //   }
    // });

    // return this.http.get('http://ec2-18-205-156-49.compute-1.amazonaws.com:5000' + this.configuration.preProcessedChartsUrl, {
    //   headers: this.headers,
    //   search: this.searchParams
    // }).map((res: Response) => res.json());
    return this.http.get(this.globalService.baseUrl + this.configuration.preProcessedChartsUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }

  public getData(pipeline: string, project: string) {
    const metricData$ = Observable.of({
      'wordFrequency': '321981',
      'noOfRecords': '9872883',
      'dataSize': '10GB',
      'noOfFeatures': '122'
    });
    const chartData$ = Observable.of(
      {
        'featureChart': {
          'type': [{
            'key': 'Numerical',
            'value': '30'
          },
          {
            'key': 'Categorical',
            'value': '70'
          }
          ]
        },
        'histogram': {
          'features': [{
            'name': 'Feature1',
            'words': [{
              'key': 'Camel',
              'frequency': '112'
            }, {
              'key': 'Nodal',
              'frequency': '55'
            }, {
              'key': 'connect',
              'frequency': '12'
            }]
          },
          {
            'name': 'Feature2',
            'words': [{
              'key': 'Nest',
              'frequency': '443'
            }, {
              'key': 'Cokkoo',
              'frequency': '234'
            }, {
              'key': 'Baseball',
              'frequency': '64'
            }]
          }
          ]
        }
      }
    );
    // const metricData$ = this.http.get(this.configuration.topMetricsUrl, { headers: this.headers ,
    //   search: this.searchParams }).map((res: Response) => res.json());
    // const chartData$ = this.http.get(this.configuration.preProcessedStatsUrl, { headers: this.headers ,
    //   search: this.searchParams }).map((res: Response) => res.json());
    return Observable.forkJoin(metricData$, chartData$);
  }
  public getTopMetrics(pipeline: string, project: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('pipeline', pipeline);
    this.searchParams.set('project', project);
    return this.http.get(this.globalService.baseUrl + this.configuration.topMetricsUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }

  public getStatsForCharts(pipeline: string, project: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('pipeline', pipeline);
    this.searchParams.set('project', project);
    // return this.http.get('http://ec2-18-205-156-49.compute-1.amazonaws.com:5000' + this.configuration.preProcessedChartsUrl, {
    //   headers: this.headers,
    //   search: this.searchParams
    // }).map((res: Response) => res.json());

    return this.http.get(this.globalService.baseUrl + this.configuration.preProcessedChartsUrl, {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }

}
