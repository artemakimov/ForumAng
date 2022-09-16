import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent  } from './pages/login/login.component';
import { AuthComponent } from './pages/auth-page/auth-page.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'sign-up', component: AuthComponent },
  { path: 'home', component: HomeComponent,},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }
