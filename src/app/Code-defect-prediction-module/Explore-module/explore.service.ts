import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ExploreService {

  public project$ = new Subject<any>();
  constructor() { }

}
