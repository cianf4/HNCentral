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

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getArticle(id).subscribe((res) => {
      console.log(res);
      this.article = res;
    })
  }

  openArticle() {
    window.open(this.article.url);
  }

}
