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
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
