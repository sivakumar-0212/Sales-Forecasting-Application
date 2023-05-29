import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';
import { VisualComponent } from './visual/visual.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' , pathMatch: 'full' },
  { path:'login',component:LoginComponent},
  { path:'result',component:ResultComponent},
  {path:'vis',component:VisualComponent},
  {path:'dash',component:DashComponent},
  {path:'signup',component:SignupComponent},
  {path:'**',component:ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
