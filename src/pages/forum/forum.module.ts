import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
    ComponentsModule
  ],
})
export class ForumPageModule {}
