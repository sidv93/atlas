import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { SessionService } from '../session-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.css']
})
export class LeftPaneComponent implements OnInit {
  public selectedPane = 0;
  constructor(public globalService: GlobalService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.selectedPane = sessionStorage.getItem('left-menu') ? +sessionStorage.getItem('left-menu') : 1;
  }

  public leftPaneSwitch() {
    this.globalService.expanded = !this.globalService.expanded;
    this.globalService.rightPaneExpand$.next();
  }

  public setSession() {
    this.sessionService.setSessionData('left-menu', this.selectedPane);
  }

  public navigate() {
    switch (this.selectedPane) {
      case 0: {
        break;
      }
      case 1: {
        this.globalService.urlFlag = true;
        this.router.navigate(['code-defect-prediction']);
        break;
      }
      case 2: {
        // this.router.navigate(['test-case-selection'])
        break;
      }
      case 3: {
        this.globalService.urlFlag = false;
        this.router.navigate(['test-case-selection']);
        break;
      }
    }
  }
}
