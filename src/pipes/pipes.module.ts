import { NgModule } from '@angular/core';
import { FirstWordPipe } from './first-word/first-word';
@NgModule({
	declarations: [
		FirstWordPipe,
	],
	imports: [],
	exports: [
		FirstWordPipe,
	]
})
export class PipesModule {}
