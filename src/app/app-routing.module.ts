import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'news/:articleId',
    loadChildren: () => import('./pages/news-details/news-details.module').then( m => m.NewsDetailsPageModule)
  },
  {
    path: 'comment/:commentId',
    loadChildren: () => import('./pages/comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'ask',
    loadChildren: () => import('./pages/ask/ask.module').then( m => m.AskPageModule)
  },
  {
    path: 'ask/:askId',
    loadChildren: () => import('./pages/ask-details/ask-details.module').then( m => m.AskDetailsPageModule)
  },
  {
    path: 'show',
    loadChildren: () => import('./pages/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'show/:showId',
    loadChildren: () => import('./pages/show-details/show-details.module').then( m => m.ShowDetailsPageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'jobs/:jobId',
    loadChildren: () => import('./pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
