import { Component, OnInit } from '@angular/core';
import { ShowService } from "../../services/show.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage implements OnInit {
  showIds: number[] = [];
  shows: any[] = [];

  constructor(
      private showService: ShowService,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadShowStories();
  }

  async loadShowStories() {
    const loading = await this.loadingController.create({
      //message: 'Attendi..',
      spinner: 'circular',
    });
    await loading.present();
    this.showService.getShowStories().subscribe(response => {
      loading.dismiss();
      this.showIds = response;
      console.log(response);
      this.showIds.forEach(showId => {
        this.showService.getShow(showId).subscribe((show) => {
          this.shows.push(show);
        });
      });
    });
  }

}
