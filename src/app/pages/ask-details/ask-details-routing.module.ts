import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskDetailsPage } from './ask-details.page';

const routes: Routes = [
  {
    path: '',
    component: AskDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskDetailsPageRoutingModule {}
