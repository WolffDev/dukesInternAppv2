import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NyhederPage } from './nyheder';

@NgModule({
  declarations: [
    NyhederPage,
  ],
  imports: [
    IonicPageModule.forChild(NyhederPage)
  ],
})
export class NyhederPageModule {}