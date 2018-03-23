import { AvatarModule } from 'ng2-avatar';
import { ForumServiceProvider } from './../../providers/forum-service/forum-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
    AvatarModule,
    DateFnsModule
  ],
  providers: [
    ForumServiceProvider
  ]
})
export class ForumPageModule {}
