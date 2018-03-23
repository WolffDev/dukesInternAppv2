import { AvatarModule } from 'ng2-avatar';
import { EventServiceProvider } from './../../providers/event-service/event-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailPage } from './event-detail';

@NgModule({
  declarations: [
    EventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailPage),
    AvatarModule
  ],
  providers: [
    EventServiceProvider
  ]
})
export class EventDetailPageModule {}
