import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../../services/news.service";
import { DateUtilityService } from "../../services/date-utility.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
  article: any = null;
  commentIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private dateService: DateUtilityService
  ) { }

  ngOnInit() {
    this.loadArticle();
  }

  loadArticle() {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getArticle(id).subscribe((article) => {
      this.article = article;
      console.log(article);
    });
  }

  openArticle() {
    window.open(this.article.url);
  }

}
