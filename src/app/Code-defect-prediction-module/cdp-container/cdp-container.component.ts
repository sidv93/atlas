import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-container',
  templateUrl: './cdp-container.component.html',
  styleUrls: ['./cdp-container.component.css']
})
export class CDPContainerComponent implements OnInit {

  public tabToShow = 'none';
  constructor(private globalService: GlobalService) {
   }

  ngOnInit() {
  }

}
