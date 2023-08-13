import { Component, OnInit } from '@angular/core';
import { AskApiResult, AskService, ReadableAskApiResult } from "../../services/ask.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-ask',
  templateUrl: './ask.page.html',
  styleUrls: ['./ask.page.scss'],
})
export class AskPage implements OnInit {
  askIds: number[] = [];
  asks: any[] = [];

  constructor(
      private askService: AskService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadAskStories();
  }

  async loadAskStories() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.askService.getAskStories().subscribe(response => {
      loading.dismiss();
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
