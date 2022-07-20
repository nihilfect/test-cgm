import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'repos',
    loadChildren: () => import('./repos/repos-routing.module')
      .then(m => m.ReposRoutingModule)
  },
  {
    path: 'commits',
    loadChildren: () => import('./commits/commits-routing.module')
      .then(m => m.CommitsRoutingModule)
  },
  { path: '**', redirectTo: 'repos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
