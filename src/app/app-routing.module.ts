import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/reg/reg.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './core/guard/home.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { QuestionPageComponent } from './pages/question-page/question-page.component'
import { PostComponent } from './pages/post/post.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {path: 'question-page', component: QuestionPageComponent, canActivate: [HomeGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'post/:id', component: PostComponent, canActivate: [HomeGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [HomeGuard] },
  { path: '**', component: HomeComponent, canActivate: [HomeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
