import { ModalPageModule } from './../modal/modal.module';
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
    ModalPageModule,
  ],
  providers: [
    EventServiceProvider
  ]
})
export class EventsPageModule {}
