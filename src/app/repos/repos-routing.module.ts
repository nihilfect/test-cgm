import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router'; 
import { RepoComponent } from './component/repo.component';
const routes: Routes = [  
 { path: '', component: RepoComponent }  
];  
 @NgModule({  
    imports: [RouterModule.forChild(routes)],  
    exports: [RouterModule]  
})  
export class ReposRoutingModule { }  