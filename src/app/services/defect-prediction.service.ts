import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
import { GlobalService } from '../global.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class DefectPredictionService {

  private searchParams: URLSearchParams;
  private headers: Headers;
  constructor(private http: Http, private globalService: GlobalService, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.set('Accept', 'application/json');
  }
  public getFileHistoryData(pipeline: string, projectid: string, release: string, filename: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('projectid', projectid);
    this.searchParams.set('filename', filename);

    return this.http.get(this.globalService.baseUrl + this.configuration.fileHistoryURL, {
      headers: this.headers, search: this.searchParams
    }).map((res: Response) => res.json());
  }
  public getPredictionData(projectId: string) {
    this.searchParams = new URLSearchParams();
    this.searchParams.set('projectid', projectId);
    // this.searchParams.set('project', project);
    // this.searchParams.set('release', release);

    // return this.http.get('http://ec2-18-205-156-49.compute-1.amazonaws.com:5000' + this.configuration.defectPredictionUrl,
    //   { headers: this.headers, search: this.searchParams}).map((res: Response) => res.json());

    return this.http.get(this.globalService.baseUrl + this.configuration.defectPredictionUrl,
      { headers: this.headers, search: this.searchParams }).map((res: Response) => res.json());
    // return Observable.of(
    //   [
    //     {
    //       'commitId': '3752',
    //       'author': 'Sid',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.6',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Clean'
    //     },
    //     {
    //       'commitId': '3752',
    //       'author': 'Sid',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.7',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'Modified',
    //       'prediction': 'Clean'
    //     },
    //     {
    //       'commitId': '4545',
    //       'author': 'Raghav',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.7',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Buggy'
    //     },
    //     {
    //       'commitId': '4545',
    //       'author': 'Raghav',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.5',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Buggy'
    //     },
    //     {
    //       'commitId': '4545',
    //       'author': 'Raghav',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.6',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Buggy'
    //     },
    //     {
    //       'commitId': '2323',
    //       'author': 'Saurabh',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.7',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Clean'
    //     },
    //     {
    //       'commitId': '5365',
    //       'author': 'Gaurav',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.7',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Buggy'
    //     },
    //     {
    //       'commitId': '1232',
    //       'author': 'Praveen',
    //       'fileName': 'com.iss.predict.ip6m.java',
    //       'version': '1.7',
    //       'commitTime': '09-Nov-17 12PM',
    //       'type': 'New',
    //       'prediction': 'Clean'
    //     }
    //   ]
    // );
  }
}
