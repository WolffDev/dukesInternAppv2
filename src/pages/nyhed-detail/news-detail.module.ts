import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDetailPage } from './news-detail';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [
    NewsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDetailPage),
    PipesModule,
    DateFnsModule,
  ],
})
export class NewsDetailPageModule {}
