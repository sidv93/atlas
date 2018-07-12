import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  public wordFrequency = [];
  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.plotWordFrequency();
  }

  public plotWordFrequency() {
    const dataset = [
      {
        data: [4, 2, 7, 6, 5],
        backgroundColor: '#74a9cd',
        hoverBackgroundColor: '#74a9cd',
        borderWidth: 1
      }
    ];
    this.wordFrequency = this.globalService.makeHorizontalBarGraph('wordFrequency', ['A', 'B', 'C', 'D', 'E'], dataset);
  }

}
