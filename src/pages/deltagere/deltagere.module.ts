import { ModalPageModule } from './../modal/modal.module';
import { EventServiceProvider } from './../../providers/event-service/event-service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeltagerePage } from './deltagere';

@NgModule({
  declarations: [
    DeltagerePage,
  ],
  imports: [
    IonicPageModule.forChild(DeltagerePage),
    ModalPageModule,
  ],
  providers: [
    EventServiceProvider
  ]
})
export class DeltagerePageModule {}
