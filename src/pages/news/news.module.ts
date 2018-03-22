import { PipesModule } from './../../pipes/pipes.module';
import { NewsServiceProvider } from './../../providers/news-service/news-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModule } from 'ng2-avatar';
import { NewsPage } from './news';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [
    NewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    AvatarModule,
    PipesModule,
    DateFnsModule
  ],
  providers: [
    NewsServiceProvider
  ]
})
export class NewsPageModule {}