import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AskService} from "../../services/ask.service";
import {LoadingController} from "@ionic/angular";
import {ShowService} from "../../services/show.service";

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
  show: any = null;
  showId: string | null = this.route.snapshot.paramMap.get('showId');

  constructor(
      private route: ActivatedRoute,
      private showService: ShowService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadShow();
  }

  async loadShow() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.showService.getShow(this.showId).subscribe((show) => {
      loading.dismiss();
      this.show = show;
      console.log(show);
    });
  }

  openShow() {
    window.open(this.show.url);
  }

}
