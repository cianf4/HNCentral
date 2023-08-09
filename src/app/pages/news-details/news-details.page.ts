import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../../services/news.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
  article: any = null;
  articleId: string | null = this.route.snapshot.paramMap.get('articleId');


  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
  ) { }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    //const id = this.route.snapshot.paramMap.get('articleId');
    this.newsService.getArticle(this.articleId).subscribe((article) => {
      this.article = article;
      console.log(article);
    });
  }

  openArticle() {
    window.open(this.article.url);
  }

}
