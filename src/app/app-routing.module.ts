import { OfertasComponent } from './ofertas/ofertas.component';
import { LandingComponent } from './landing/landing.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent,children:[
    { path: '', component: LandingComponent }, 
    { path: 'perfil', component: PerfilComponent }, 
    { path: 'ofertas', component: OfertasComponent }, 
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
