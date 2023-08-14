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


     async loadSubmissions() {
        const loading = await this.loadingController.create({
            spinner: 'circular',
        });
        await loading.present();
        this.userService.getUserStoryIds(this.userId).subscribe(response => {
            loading.dismiss();
            this.storyIds = response;
            console.log(response);
            this.storyIds.forEach(storyId => {
                this.storyService.getArticle(storyId).subscribe((story) => {
                    if ( story.type === 'story' && story.title ){
                        this.stories.push(story);
                        console.log(story);
                    }
                });
            });
        });
     }


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
