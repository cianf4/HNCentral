import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../services/storage.service";
import { NewsService, ReadableNewsApiResult } from "../../services/news.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteIds: string[] = [];
  favorites: any[] = [];

  constructor(
      private loadingController: LoadingController,
      private storageService: StorageService,
      private newsService: NewsService
  ) { }

  async ngOnInit() {
    this.favoriteIds = await this.storageService.get();
    if (this.favoriteIds.length > 0) {
      this.loadFavoriteArticles();
    }
  }

  async loadFavoriteArticles() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    for (const storyId of this.favoriteIds) {
      this.newsService.getArticle(storyId).subscribe(story => {
        loading.dismiss();
        this.favorites.push(story);
      });
    }
  }

}
