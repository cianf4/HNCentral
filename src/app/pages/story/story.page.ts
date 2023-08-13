import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any = null;
  storyId: string | null = this.route.snapshot.paramMap.get('storyId');
  showFullText: { [commentId: string]: boolean } = {};
  maxLength: number = 400;

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private storyService: NewsService
  ) { }

  ngOnInit() {
    this.loadStory();
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

  openArticle() {
    window.open(this.story.url);
  }

  toggleText(commentId: string | number) {
    this.showFullText[commentId] = !this.showFullText[commentId];
  }

}
