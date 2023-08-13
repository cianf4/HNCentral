import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {AskService} from "../../services/ask.service";

@Component({
  selector: 'app-ask-details',
  templateUrl: './ask-details.page.html',
  styleUrls: ['./ask-details.page.scss'],
})
export class AskDetailsPage implements OnInit {
  ask: any = null;
  askId : string | null = this.route.snapshot.paramMap.get('askId');

  constructor(
      private route: ActivatedRoute,
      private askService: AskService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadAsk();
  }

  async loadAsk() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.askService.getAsk(this.askId).subscribe((ask) => {
      loading.dismiss();
      this.ask = ask;
      console.log(ask);
    });
  }


}
