import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThreadsPage } from './threads.page';

const routes: Routes = [
  {
    path: '',
    component: ThreadsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreadsPageRoutingModule {}
