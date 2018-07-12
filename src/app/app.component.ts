import { Component, AfterViewInit } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';

  public constructor(private globalService: GlobalService) { }

  ngAfterViewInit() {
    let url = window.location.href.split('/').filter(item => item !== '').map((item, index, arr) => arr[arr.length - 1])[0].split(':');
    if (!isNaN(+url[url.length - 1])) {
      this.globalService.urlFlag = true;
    } else {
      this.globalService.urlFlag = window.location.href.lastIndexOf('code-defect-prediction') !== -1;
    }
  }
}
