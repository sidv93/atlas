import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { SessionService } from '../../../session-service';
import { ProductService } from '../../../services/product.service';
import { ExploreService } from '../explore.service';

@Component({
  selector: 'app-tabs-explore',
  templateUrl: './tabs-explore.component.html',
  styleUrls: ['./tabs-explore.component.css']
})
export class TabsExploreComponent implements OnInit {

  public selectedTab = 0;
  public projects;
  public project;
  constructor(public globalService: GlobalService, private sessionService: SessionService, private productService: ProductService,
    private exploreService: ExploreService) {
    this.globalService.secondLayerTabs$.subscribe(
      data => {
        if (data === 1) {
          this.selectedTab = 0;
        }
      }
    );
  }

  ngOnInit() {
  }
}
