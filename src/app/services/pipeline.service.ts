import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class PipelineService {

  private searchParams: URLSearchParams;
  private headers: Headers;

  constructor(private http: Http, private configuration: Configuration,
    private globalService: GlobalService) {
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
  }

  public getPipelines(pipeline: string, project: string, release: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('pipeline', pipeline);
    this.searchParams.set('project', project);
    this.searchParams.set('release', release);
    return Observable.of(
      {
        'details': [{
          'fileid': '1',
          'description': 'core_CDP',
          'type': 'CDP',
          'model': 'cdp_4.2.v1',
          'creationDate': 'Mar 03 2018, 10:12:00 AM',
          'status': 'Completed',
          'bestModel': 'Multilayer Perceptron',
          'bestAccuracy': '87.78%'
        },
          // {
          //   'fileid': '1',
          //   'description': 'CDP_R4.2',
          //   'type': 'CDP',
          //   'model': 'cdp_4.2.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'New',
          //   'bestAccuracy': 'NA'
          // },
          // {
          //   'fileid': '2',
          //   'description': 'RCA_R4.3',
          //   'type': 'RCA',
          //   'model': 'rca_4.3.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'Completed',
          //   'bestAccuracy': '88'
          // },
          // {
          //   'fileid': '3',
          //   'description': 'RCA_R4.4',
          //   'type': 'RCA',
          //   'model': 'rca_4.4.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'InProgress',
          //   'bestAccuracy': 'NA'
          // },
          // {
          //   'fileid': '4',
          //   'description': 'CDP_R4.5',
          //   'type': 'CDP',
          //   'model': 'cdp_4.5.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'Failed',
          //   'bestAccuracy': 'NA'
          // },
          // {
          //   'fileid': '4',
          //   'description': 'TCS_R4.5',
          //   'type': 'TCS',
          //   'model': 'tcs_4.5.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'Failed',
          //   'bestAccuracy': 'NA'
          // },
          // {
          //   'fileid': '4',
          //   'description': 'TCS_R4.5',
          //   'type': 'TCS',
          //   'model': 'tcs_4.5.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'Failed',
          //   'bestAccuracy': 'NA'
          // },
          // {
          //   'fileid': '4',
          //   'description': 'CDP_R4.5',
          //   'type': 'CDP',
          //   'model': 'cdp_4.5.v1',
          //   'creationDate': '03-March-18',
          //   'status': 'Failed',
          //   'bestAccuracy': 'NA'
          // }
        ]
      });
    // return this.http.get(this.globalService.baseUrl + this.configuration.pipelineUrl, { headers: this.headers })
    // .map((res: Response) => res.json());
  }


  public getWorkFlow(pipeline: string, project: string, release: string) {
    // this.searchParams = new URLSearchParams();
    // this.searchParams.set('pipeline', pipeline);
    // this.searchParams.set('project', project);
    // this.searchParams.set('release', release);
    return Observable.of(
      {
        'workflow': {
          'node': [{
            'sortOrder': '1',
            'name': 'Reader',
            'level': '1',
            'function': 'PreProcessing step'
          }, {
            'sortOrder': '2',
            'name': 'Imputation',
            'level': '2',
            'function': 'Imputing Columns'
          }, {
            'sortOrder': '3',
            'name': 'Labelling',
            'level': '3',
            'function': 'PreProcessing step for labelling data'
          }, {
            'sortOrder': '4',
            'name': 'One Hot Encoding',
            'level': '4',
            'function': 'PreProcessing step'
          }, {
            'sortOrder': '5',
            'name': 'PCA',
            'level': '5',
            'function': 'PreProcessing step'
          }, {
            'sortOrder': '1',
            'name': 'SVM',
            'level': '6',
            'function': 'Algorithm Step - Bulding Model'
          }, {
            'sortOrder': '2',
            'name': 'DT',
            'level': '6',
            'function': 'PreProcessing step - Building Model'
          }, {
            'sortOrder': '3',
            'name': 'LDA',
            'level': '6',
            'function': 'PreProcessing step - Building Model'
          }, {
            'sortOrder': '4',
            'name': 'NB',
            'level': '6',
            'function': 'PreProcessing step - Building Model'
          }, {
            'sortOrder': '6',
            'name': 'ModelEval',
            'level': '7',
            'function': 'Evaluating model'
          }, {
            'sortOrder': '7',
            'name': 'Output',
            'level': '8',
            'function': 'Algorithm output for comparison'
          }]
        }
      });
    // return this.http.get(this.globalService.baseUrl + this.configuration.pipelineExperimentUrl,
    //   { headers: this.headers, search: this.searchParams })
    //   .map((res: Response) => res.json());
  }


  public getPipelineExperiments(productId: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('productid', productId);
    return this.http.get(this.globalService.baseUrl + this.configuration.pipelineExperimentUrl,
      { headers: this.headers, search: this.searchParams })
      .map((res: Response) => res.json());
  }

  public getTrainingPipelineData(productId: string) {
    this.searchParams = new URLSearchParams;
    this.searchParams.set('productid', productId);
    return this.http.get(this.globalService.baseUrl + this.configuration.trainingPipelineUrl,
      {
        headers: this.headers,
        search: this.searchParams
      }).map((res: Response) => res.json());
  }

  public getTrainingRunData(pipelineId: string) {
    this.searchParams = new URLSearchParams;
    this.searchParams.set('pipelineid', pipelineId);
    return this.http.get(this.globalService.baseUrl + this.configuration.trainingRunsUrl,
      {
        headers: this.headers,
        search: this.searchParams
      }).map((res: Response) => res.json());
  }

  public getUnivariateData(projectId: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('projectid', projectId);
    return this.http.get(this.globalService.baseUrl + this.configuration.univariateUrl,
    {
      headers: this.headers,
      search: this.searchParams
    }).map((res: Response) => res.json());
  }
}

