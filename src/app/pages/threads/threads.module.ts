import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThreadsPageRoutingModule } from './threads-routing.module';

import { ThreadsPage } from './threads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThreadsPageRoutingModule
  ],
  declarations: [ThreadsPage]
})
export class ThreadsPageModule {}
