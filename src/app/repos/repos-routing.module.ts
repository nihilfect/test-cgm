import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router'; 
import { RepoComponent } from './repo/repo.component';
const routes: Routes = [  
 { path: '', component: RepoComponent }  
];  
 @NgModule({  
    imports: [RouterModule.forChild(routes)],  
    exports: [RouterModule]  
})  
export class ReposRoutingModule { }  