import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';



const appRouter: Routes =[
  {
    path:'',
    loadChildren: () => import('./editor/editor.module').then(mod => mod.EditorModule),
    data: { preload: true }
  }, 
  {
    path: '',
    loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule),
    data: { preload: true }
  }
  
]


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
