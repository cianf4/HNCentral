import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: number[] = [];

  constructor(private newsService: NewsService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadNews();
  }

  async loadNews() {
    const loading = await this.loadingController.create({
      //message: 'Attendi..',
      spinner: 'circular'
    });
    await loading.present();

    this.newsService.getTopNews().subscribe((res: number[]) => {
      loading.dismiss();
      this.news = res;
      console.log(res)
    })
  }

}
