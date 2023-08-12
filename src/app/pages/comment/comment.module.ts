import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import { CommentComponent } from "../../components/comment/comment.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule
  ],
  declarations: [CommentPage, CommentComponent],
})
export class CommentPageModule {}
