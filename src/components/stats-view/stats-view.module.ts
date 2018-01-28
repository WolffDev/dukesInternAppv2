import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StatsViewComponent } from './stats-view';

@NgModule({
	declarations: [
		StatsViewComponent,
	],
	imports: [
		IonicModule,
	],
	exports: [
		StatsViewComponent
	],
	providers: [
	]
})
export class StatsViewModule {}