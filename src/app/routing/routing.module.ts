import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FbrootComponent} from '../fbformv1/fbroot/fbroot.component';
import {LoginComponent} from '../login/login/login.component';
import {LogoutComponent} from '../login/login/logout.component';
import { RouterModule,Routes } from '@angular/router';
import {FacultyrootComponent} from '../addfacultydetail/facultyroot/facultyroot.component';
import {AuthGuard} from './auth.guard';
const routeList:Routes = [
  {
    path:'',
    redirectTo:'addfacultydetail',
    pathMatch:'full'
    // redirectTo:'fbform',
    // pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'logout',component:LogoutComponent
  },
  {
    path:'fbform',
    canActivate:[AuthGuard],canDeactivate:[AuthGuard],
    component:FbrootComponent
  },
  {
    path:'addfacultydetail',
    component:FacultyrootComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routeList)
  ],
  exports:[RouterModule],
  declarations: [],
  providers:[AuthGuard]
})
export class RoutingModule { }
