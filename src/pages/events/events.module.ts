import { EventServiceProvider } from './../../providers/event-service/event-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';

@NgModule({
  declarations: [
    EventsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsPage),
  ],
  providers: [
    EventServiceProvider
  ]
})
export class EventsPageModule {}
