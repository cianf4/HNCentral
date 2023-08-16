import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InfiniteScrollCustomEvent, LoadingController } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { NewsService } from "../../services/news.service";

@Component({
    selector: 'app-submissions',
    templateUrl: './submissions.page.html',
    styleUrls: ['./submissions.page.scss'],
})
export class SubmissionsPage implements OnInit {
    userId: string | null = this.route.snapshot.paramMap.get('userId');
    ids: number[] = [];
    submissions: any[] = [];
    first: number = 0;
    last: number = 50;
    increment: number = 50;

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
      this.userService.getUserStoryIds(this.userId).subscribe(response => {
          loading.dismiss();
          this.ids = response.slice(this.first, this.last);
          console.log(this.ids);
          this.ids.forEach(storyId => {
              this.storyService.getArticle(storyId).subscribe((story) => {
                  if ( story.type === 'story' && story.title ){
                      this.submissions.push(story);
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
        this.loadSubmissions(event);
    }

    /**Metodo con caricamento totale
     async loadSubmissions() {
     const loading = await this.loadingController.create({
     spinner: 'circular',
     });
     await loading.present();
     let pendingRequests = 0; // Contatore per richieste in sospeso
     this.userService.getUserStoryIds(this.userId).subscribe(response => {
     this.storyIds = response;
     this.storyIds.forEach(storyId => {
     pendingRequests++; // Incrementa il contatore per ogni richiesta
     this.storyService.getArticle(storyId).subscribe((story) => {
     if (story.type === 'story') {
     this.stories.push(story);
     console.log(story)
     }
     pendingRequests--; // Decrementa il contatore quando una richiesta è stata completata
     if (pendingRequests === 0) {
     loading.dismiss(); // Chiudi il loadingController quando tutte le richieste sono state completate
     }
     });
     });
     });
     }**/


  /** Metodi per infinite scroll
  async loadSubmissions(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();

    this.userService.getUserStoryIds(this.userId).subscribe(ids => {
      loading.dismiss();
      let pagedIds = this.storyService.fromArrayToKeyValue(ids);
      this.loadPagedArticles(pagedIds);
      console.log(ids);
      console.log(pagedIds);
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
          if( story.type === "story" ){
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
      **/
}
