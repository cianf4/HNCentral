import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { NewsService, ReadableNewsApiResult } from "../../services/news.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteIds: string[] = [];
  favorites: any[] = [];

  constructor(
      private storageService: StorageService,
      private newsService: NewsService
  ) { }

  async ngOnInit() {
    this.favoriteIds = await this.storageService.get();
    this.loadFavoriteArticles();
  }

  loadFavoriteArticles() {
    for (const storyId of this.favoriteIds) {
      this.newsService.getArticle(storyId).subscribe(story => {
        this.favorites.push(story);
      });
    }
  }

}
