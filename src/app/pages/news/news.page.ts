import { Component, OnInit } from '@angular/core';
import { NewsApiResult, NewsService, ReadableNewsApiResult } from "../../services/news.service";
import { InfiniteScrollCustomEvent, LoadingController } from "@ionic/angular";


@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  articles: any[] = [];
  currentPage = 1;
  totalPages = 25;  //20 articoli per pagina

  constructor(
    private newsService: NewsService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadTopStories();
  }

  async loadTopStories(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      //message: 'Attendi..',
      spinner: 'circular',
    });
    await loading.present();

    this.newsService.getTopStories().subscribe(ids => {
      loading.dismiss();
      let pagedIds = this.newsService.fromArrayToKeyValue(ids);
      this.loadPagedArticles(pagedIds);
      console.log(ids);
      console.log(pagedIds)
      //console.log(this.newsService.fromArrayToKeyValue(ids));
      event?.target.complete();
      if (event) {
        event.target.disabled = this.totalPages === this.currentPage;
      }
    });
  }

  loadPagedArticles(pagedIds: { [p: number]: number[] }) {
    const currentPage = this.currentPage;
    const ids = pagedIds[currentPage];
    if (ids) {
      ids.forEach(id => {
        this.newsService.getArticle(id).subscribe(article => {
          this.articles.push(article);
          console.log(article);
        });
      });
    }
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadTopStories(event);
  }

  /**
   loadArticles(ids: number[]) {
   // Loop through the article IDs and fetch each article
   ids.forEach(id => {
   this.newsService.getArticle(id).subscribe(article => {
   article.readableDate = this.newsService.convertUnixToDate(article.time);
   this.articles.push(article);
   console.log(article);
   });
   });
   }
   **/

  /**
  loadPagedArticles(pagedIds: { [p: number]: number[] }) {
    // Loop through the pages in pagedIds
    for (const page in pagedIds) {
      const ids = pagedIds[page];
      ids.forEach(id => {
        this.newsService.getArticle(id).subscribe(article => {
          article.readableDate = this.newsService.convertUnixToDate(article.time);
          this.articles.push(article);
          console.log(article);
        });
      });
    }
  }
  **/
}
