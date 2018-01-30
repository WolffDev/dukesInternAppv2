import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NyhedDetailPage } from './nyhed-detail';

@NgModule({
  declarations: [
    NyhedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NyhedDetailPage),
    PipesModule
  ],
})
export class NyhedDetailPageModule {}
