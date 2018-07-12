import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-deploy-container',
  templateUrl: './deploy-container.component.html',
  styleUrls: ['./deploy-container.component.css']
})
export class DeployContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
