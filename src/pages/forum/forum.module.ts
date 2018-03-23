import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
  ],
  providers: [
    ForumServiceProvider
  ]
})
export class ForumPageModule {}
