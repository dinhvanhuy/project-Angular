import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRouter: Routes = [];


@NgModule({
	imports: [
		RouterModule.forRoot(
			appRouter,
			{
				enableTracing: false,
				preloadingStrategy: PreloadAllModules ,
			}
		),

	],
	exports: [
		RouterModule
	]

})
export class AppRoutingModule { }
