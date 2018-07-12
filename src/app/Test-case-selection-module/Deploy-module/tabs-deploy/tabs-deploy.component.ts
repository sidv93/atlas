import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { SessionService } from '../../../session-service';

@Component({
  selector: 'app-tabs-deploy',
  templateUrl: './tabs-deploy.component.html',
  styleUrls: ['./tabs-deploy.component.css']
})
export class TabsDeployComponent implements OnInit {

  public selectedTab = 0;
  constructor(private globalService: GlobalService, private sessionService: SessionService) {
  }

  ngOnInit() {
  }
}
