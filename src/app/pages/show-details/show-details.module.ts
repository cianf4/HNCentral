import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowDetailsPageRoutingModule } from './show-details-routing.module';

import { ShowDetailsPage } from './show-details.page';
import {NewsDetailsPageModule} from "../news-details/news-details.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ShowDetailsPageRoutingModule,
        NewsDetailsPageModule
    ],
  declarations: [ShowDetailsPage]
})
export class ShowDetailsPageModule {}
