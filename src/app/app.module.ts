import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/components/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import { RegistrationComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthService } from './core/services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './core/guards/home.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { HttpClientModule }   from '@angular/common/http';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

@NgModule({
  declarations: [
    SignInComponent,
    RegistrationComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreatePostComponent,
    PostPageComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [HomeGuard, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
