import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/reg/reg.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardModule } from './core/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardModule] },
  { path: '**', component: HomeComponent, canActivate: [AuthGuardModule] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
