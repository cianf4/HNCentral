import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NewsService} from "../../services/news.service";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any = null;
  storyId: string | null = this.route.snapshot.paramMap.get('storyId');
  isFavorite: boolean | undefined;
  showFullText: { [commentId: string]: boolean } = {};
  maxLength: number = 400;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private storyService: NewsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loadStory();
    this.updateFavoriteStatus();
  }

  async loadStory() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.storyService.getArticle(this.storyId).subscribe((story) => {
      loading.dismiss();
      this.story = story;
      console.log(story);
    });
  }

  addToFavorites() {
    this.storageService.add(this.storyId);
  }

  async updateFavoriteStatus() {
    this.isFavorite = await this.storageService.check(this.storyId);
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.storageService.remove(this.storyId);
      this.isFavorite = false;
    } else {
      await this.storageService.add(this.storyId);
      this.isFavorite = true;
    }
  }

  openArticle() {
    window.open(this.story.url);
  }

  toggleText(commentId: string | number) {
    this.showFullText[commentId] = !this.showFullText[commentId];
  }

}
