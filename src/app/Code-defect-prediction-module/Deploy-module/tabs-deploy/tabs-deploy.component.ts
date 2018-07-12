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
  public tabs = [
    {
      'name': 'ABCD',
      'route': ''
    },
    {
      'name': 'DEFECT PREDICTION',
      'route': ''
    },
    {
      'name': 'ANALYTICS',
      'route': ''
    },
    {
      'name': 'FILE HISTORY',
      'route': ''
    },
    {
      'name': 'STATIC ANALYSIS',
      'route': ''
    },
    {
      'name': 'FILE DIFF',
      'route': ''
    },
    {
      'name': 'PRE PROCESSED STATS',
      'route': ''
    }
  ];
  constructor(private globalService: GlobalService, private sessionService: SessionService) {
    this.globalService.tabSwitch$.subscribe(
      data => {
        if (data === 'file-history') {
          this.selectedTab = 4;
        }
      }
    );
    this.globalService.secondLayerTabs$.subscribe(
      data => {
        console.log('sub=' + data);
        if (data === 3) {
          this.selectedTab = 0;
        }
      }
    );
  }

  ngOnInit() {
  }
}
