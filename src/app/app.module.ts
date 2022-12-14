import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/components/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './pages/reg/reg.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './core/services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './core/guard/home.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { HttpClientModule }   from '@angular/common/http';
import { PostComponent } from './pages/post/post.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    QuestionPageComponent,
    PostComponent,
    EditComponent,
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
