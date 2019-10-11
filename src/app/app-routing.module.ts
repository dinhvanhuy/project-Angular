import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRouter: Routes =[
  {
    path:'editor',
    loadChildren: () => import('./editor/editor.module').then(mod => mod.EditorModule),
    data: { preload: true }
  }, 
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule)
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
