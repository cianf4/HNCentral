import { Component, OnInit } from '@angular/core';
import {AskApiResult, AskService, ReadableAskApiResult} from "../../services/ask.service";

@Component({
  selector: 'app-ask',
  templateUrl: './ask.page.html',
  styleUrls: ['./ask.page.scss'],
})
export class AskPage implements OnInit {
  askIds: number[] = [];
  asks: any[] = [];

  constructor(
      private askService: AskService
  ) { }

  ngOnInit() {
    this.loadAskStories();
  }

  loadAskStories() {
    this.askService.getAskStories().subscribe(response => {
      this.askIds = response;
      console.log(response);
      this.askIds.forEach(askId => {
        this.askService.getAsk(askId).subscribe((ask) => {
          this.asks.push(ask);
        });
      });
    });
  }

}
