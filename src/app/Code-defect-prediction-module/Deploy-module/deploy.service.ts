import { Injectable } from '@angular/core';

@Injectable()
export class DeployService {

  public fromDefect = false;
  public predictionData;
  private fileHistorydata;

  public setFileHistoryData(data: any) {
    this.fileHistorydata = data;
  }
  public getFileHistoryData() {
    return this.fileHistorydata;
  }
  
  constructor() { }

}
