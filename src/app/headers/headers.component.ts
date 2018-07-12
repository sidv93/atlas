import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { GlobalService } from '../global.service';
import { SessionService } from '../session-service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  public product;
  public today;
  constructor(private productService: ProductService, public globalService: GlobalService, private sessionService: SessionService) { }

  ngOnInit() {
    const day = new Date();
    this.today = day.toLocaleString('en-us', { weekday: 'long' }) + ',' +
      day.getDate() + ' ' + day.toLocaleString('en-us', { month: 'long' });
    this.getProductList();
  }

  public getProductList() {
    this.productService.getProductList().subscribe(
      data => {
        this.globalService.productList = data.result.details;
        this.product = this.globalService.productList[0].productID;
        console.log('product-' + JSON.stringify(this.product));
        this.globalService.product = this.globalService.productList[0];
        this.globalService.productsLoaded = true;
        this.globalService.productsFetched$.next();
      },
      error => {
        console.log('error=' + JSON.stringify(error));
      }
    );
  }

  public logout() {
    this.sessionService.removeSessionData();
  }

  public changeProduct() {
    console.log('pro-' + this.product);
    this.globalService.product = this.globalService.productList.filter(item => item.productID === this.product)[0];
    console.log('cahnged-' + JSON.stringify(this.globalService.product));
    this.globalService.changeProduct$.next();
  }
}
