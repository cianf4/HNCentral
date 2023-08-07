import { Component, OnInit } from '@angular/core';
import { NewsService } from "../../services/news.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  articles: any[] = [];

  constructor(
    private newsService: NewsService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadTopStories();
  }

  async loadTopStories() {
    const loading = await this.loadingController.create({
      //message: 'Attendi..',
      spinner: 'circular',
    });
    await loading.present();

    this.newsService.getTopStories().subscribe(ids => {
      loading.dismiss();
      // Assuming you want to show only the first 10 articles for now
      //const firstTenIds = ids.slice(0, 10);
      //this.loadArticles(firstTenIds);
      this.loadArticles(ids);
      console.log(ids);
    });
  }

  loadArticles(ids: number[]) {
    // Loop through the article IDs and fetch each article
    ids.forEach(id => {
      this.newsService.getArticle(id).subscribe(article => {
        article.readableDate = this.newsService.convertUnixToDate(article.time);
        this.articles.push(article);
      });
    });
    console.log(this.articles);
  }

}
