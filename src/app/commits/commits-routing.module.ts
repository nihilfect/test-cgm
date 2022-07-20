import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router'; 
import { CommitComponent } from './component/commit.component';
const routes: Routes = [ 
 { path: '', component: CommitComponent }  
];  
 @NgModule({  
    imports: [RouterModule.forChild(routes)],  
    exports: [RouterModule] 
})  
export class CommitsRoutingModule { }  