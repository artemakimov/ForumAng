import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegistrationComponent } from './pages/sign-up/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './core/guards/home.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { CreatePostComponent } from './pages/create-post/create-post.component'
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

const routes: Routes = [
  {path: 'create-post', component: CreatePostComponent, canActivate: [HomeGuard]},
  { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'post-page/:id', component: PostPageComponent, canActivate: [HomeGuard] },
  { path: 'edit-post-page/:id', component: EditPostComponent, canActivate: [HomeGuard] },
  { path: '**', component: HomeComponent, canActivate: [HomeGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
