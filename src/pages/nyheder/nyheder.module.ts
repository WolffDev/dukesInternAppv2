import { NyhederServiceProvider } from './../../providers/nyheder-service/nyheder-service';
import { PipesModule } from './../../pipes/pipes.module';
import { StatsViewModule } from './../../components/stats-view/stats-view.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvatarModule } from 'ng2-avatar';
import { NyhederPage } from './nyheder';

@NgModule({
  declarations: [
    NyhederPage,
  ],
  imports: [
    IonicPageModule.forChild(NyhederPage),
    StatsViewModule,
    AvatarModule,
    PipesModule,
  ],
  providers: [
    NyhederServiceProvider,
  ]
})
export class NyhederPageModule {}