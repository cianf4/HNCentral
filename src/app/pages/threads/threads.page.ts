import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InfiniteScrollCustomEvent, LoadingController } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { CommentsService } from "../../services/comments.service";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-threads',
  templateUrl: './threads.page.html',
  styleUrls: ['./threads.page.scss'],
})
export class ThreadsPage implements OnInit {
  userId: string | null = this.route.snapshot.paramMap.get('userId');
  ids: number[] = [];
  threads: any[] = [];
  first: number = 0;
  last: number = 50;
  increment: number = 50;
  parents: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private loadingController: LoadingController,
      private userService: UserService,
      private commentService: CommentsService,
      private newsService: NewsService
  ) { }

  ngOnInit() {
    this.loadThreads();
  }

  async loadThreads(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.userService.getUserStoryIds(this.userId).subscribe(response => {
      loading.dismiss();
      this.ids = response.slice(this.first, this.last);
      console.log(this.ids);
      this.ids.forEach((storyId, index) => {
        this.commentService.getComment(storyId).subscribe((story) => {
          if ( story.type === 'comment' && story.parent ){
            this.threads.push(story);
            console.log(story);
          }
        });
      });
      event?.target.complete();
    });
  }

  loadMore(event: any) {
    this.first = this.first + this.increment;
    this.last = this.last + this.increment;
    this.loadThreads(event);
  }

}
