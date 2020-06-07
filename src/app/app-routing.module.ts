import { HomeComponent } from './components/home/home.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'login',canActivate:[BeforeLoginService],component:LoginComponent,data:{title:'login',description:'connecter vous'}},
  {path:'signup',canActivate:[BeforeLoginService],component:SignupComponent},
  {path:'profile',canActivate:[AfterLoginService],component:ProfileComponent},
  {path:'request-password-reset',canActivate:[BeforeLoginService],component:RequestResetComponent},
  {path:'response-password-reset',canActivate:[BeforeLoginService],component:ResponseResetComponent},
  {path:'',component:HomeComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
