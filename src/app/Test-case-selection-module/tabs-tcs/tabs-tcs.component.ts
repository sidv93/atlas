import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SessionService } from '../../session-service';

@Component({
  selector: 'app-tabs-tcs',
  templateUrl: './tabs-tcs.component.html',
  styleUrls: ['./tabs-tcs.component.css']
})
export class TabsTcsComponent implements OnInit {

  public selectedTab = 0;

  constructor(private globalService: GlobalService, private sessionService: SessionService) { }

  ngOnInit() {

  }

  public setSession() {
    this.globalService.secondLayerTabs$.next(this.selectedTab);
    this.sessionService.setSessionData('top-tab', this.selectedTab);
  }
}
