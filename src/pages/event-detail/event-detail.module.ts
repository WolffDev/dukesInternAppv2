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
  ],
  providers: [
    EventServiceProvider
  ]
})
export class EventDetailPageModule {}
