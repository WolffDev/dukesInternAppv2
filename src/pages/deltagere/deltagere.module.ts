import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeltagerePage } from './deltagere';

@NgModule({
  declarations: [
    DeltagerePage,
  ],
  imports: [
    IonicPageModule.forChild(DeltagerePage),
    ComponentsModule
  ],
})
export class DeltagerePageModule {}
