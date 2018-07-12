import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../session-service';
import { GlobalService } from '../../../global.service';
import { EvaluateService } from '../evaluate.service';

@Component({
  selector: 'app-tabs-evaluate',
  templateUrl: './tabs-evaluate.component.html',
  styleUrls: ['./tabs-evaluate.component.css']
})
export class TabsEvaluateComponent implements OnInit {

  public selectedTab = 0;
  constructor(private sessionService: SessionService, private globalService: GlobalService, private evaluateService: EvaluateService) {
    this.globalService.secondLayerTabs$.subscribe(
      data => {
        if (data === 2) {
          this.selectedTab = 0;
        }
      }
    );
    this.evaluateService.router$.subscribe(
      data => {
        this.selectedTab = data;
      }
    );
  }

  ngOnInit() {
  }
}
