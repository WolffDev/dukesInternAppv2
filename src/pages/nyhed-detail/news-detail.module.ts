import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailPage } from './news-detail';

@NgModule({
  declarations: [
    NewsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDetailPage),
    PipesModule
  ],
})
export class NewsDetailPageModule {}
