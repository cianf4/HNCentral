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
    path: 'story/:storyId',
    loadChildren: () => import('./pages/story/story.module').then( m => m.StoryPageModule)
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
    path: 'show',
    loadChildren: () => import('./pages/show/show.module').then( m => m.ShowPageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'user/:userId',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'user/:userId/submissions',
    loadChildren: () => import('./pages/submissions/submissions.module').then( m => m.SubmissionsPageModule)
  },
  {
    path: 'user/:userId/threads',
    loadChildren: () => import('./pages/threads/threads.module').then( m => m.ThreadsPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
