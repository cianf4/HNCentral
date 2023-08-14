import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {NewsService} from "../../services/news.service";

@Component({
    selector: 'app-submissions',
    templateUrl: './submissions.page.html',
    styleUrls: ['./submissions.page.scss'],
})
export class SubmissionsPage implements OnInit {
    userId: string | null = this.route.snapshot.paramMap.get('userId');
    storyIds: number[] = [];
    stories: any[] = [];
    currentPage = 1;
    totalPages = 25;  //20 articoli per pagina

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private userService: UserService,
    private storyService: NewsService
  ) {
  }

  ngOnInit() {
    this.loadSubmissions()
  }

  async loadSubmissions(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.storyService.getTopStories().subscribe(ids => {
      loading.dismiss();
      let pagedIds = this.storyService.fromArrayToKeyValue(ids);
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
        this.storyService.getArticle(id).subscribe(story => {
          if( story.type === "story" && story.title ){
            this.stories.push(story);
            console.log(story);
          }
        });
      });
    }
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadSubmissions(event);
  }


  /**
  async loadStories() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.userService.getUserStoryIds(this.userId).subscribe((ids) => {
      loading.dismiss();
      this.storyIds = ids;
      const storyObservables = this.storyIds.map(id => this.storyService.getArticle(id));
      for (const storyObservable of storyObservables) {
        storyObservable.subscribe((story) => {
          if (story.type === 'story'  && story.title) {
            this.stories.push(story);
          }

        });
      }
    });
  }
  **/


    /**
     if (this.stories.length === storyObservables.length) {
     loading.dismiss();
     **/


    /**
     async loadUserStoryIds() {
     const loading = await this.loadingController.create({
     spinner: 'circular',
     });
     await loading.present();

     this.userService.getUserStoryIds(this.userId).subscribe((ids) => {
     loading.dismiss();
     this.storyIds = ids;
     console.log(ids);
     });
     }
     **/

}
