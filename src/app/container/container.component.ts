import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  public leftPaneExpand = false;
  constructor(private globalService: GlobalService) {
    this.globalService.rightPaneExpand$.subscribe(
      data => {
        this.leftPaneExpand = !this.leftPaneExpand;
      });
   }

  ngOnInit() {
  }

}
