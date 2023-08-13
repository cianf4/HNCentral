import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailsPageRoutingModule } from './news-details-routing.module';

import { NewsDetailsPage } from './news-details.page';
import { CommentSectionComponent } from "../../components/comment-section/comment-section.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailsPageRoutingModule
  ],
  exports: [
    CommentSectionComponent
  ],
  declarations: [NewsDetailsPage, CommentSectionComponent]
})
export class NewsDetailsPageModule {}
