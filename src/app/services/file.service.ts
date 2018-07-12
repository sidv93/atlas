import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileService {

  private headers: Headers;
  private searhParams: URLSearchParams;

  constructor(private http: Http) {
    this.headers = new Headers();
   }

   public getFiles() {
     return Observable.of(

     );
   }
}
