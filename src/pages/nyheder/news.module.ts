import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModule } from 'ng2-avatar';
import { NewsPage } from './news';
import { NewsServiceProvider } from '../../providers/news-service/news-service';

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    AvatarModule,
    PipesModule,
  ],
  providers: [
    NewsServiceProvider
  ]
})
export class NewsPageModule {}