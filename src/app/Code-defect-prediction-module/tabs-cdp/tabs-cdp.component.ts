import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { SessionService } from '../../session-service';

@Component({
  selector: 'app-tabs-top',
  templateUrl: './tabs-cdp.component.html',
  styleUrls: ['./tabs-cdp.component.css']
})
export class TabsCDPComponent implements OnInit {
  public selectedTab = 3;

  constructor(private globalService: GlobalService, private sessionService: SessionService) {
  }

  ngOnInit() {

  }
}
