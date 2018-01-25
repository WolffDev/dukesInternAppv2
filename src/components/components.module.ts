import { NgModule } from '@angular/core';
import { CustomHeaderNavComponent } from './custom-header-nav/custom-header-nav';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [CustomHeaderNavComponent],
	imports: [IonicModule],
	exports: [CustomHeaderNavComponent]
})
export class ComponentsModule {}
