import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EvaluateService {

  public router$ = new Subject<any>();
  public pipeline;
  constructor() { }
}
