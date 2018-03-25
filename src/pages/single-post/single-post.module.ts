import { AvatarModule } from 'ng2-avatar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePostPage } from './single-post';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [
    SinglePostPage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePostPage),
    AvatarModule,
    DateFnsModule
  ],
})
export class SinglePostPageModule {}
