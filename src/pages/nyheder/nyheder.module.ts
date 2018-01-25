import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NyhederPage } from './nyheder';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NyhederPage,
  ],
  imports: [
    IonicPageModule.forChild(NyhederPage),
    ComponentsModule
  ],
})
export class NyhederPageModule {}
