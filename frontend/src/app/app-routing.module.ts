import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { GuestGuard } from './core/auth/guards/guest.guard';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
