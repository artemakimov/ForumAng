import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/components/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { RegistrationComponent } from './pages/reg/reg.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './core/service/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { HomeGuard } from './core/guard/home.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { QuestionPageComponent } from './pages/question-page/question-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    QuestionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [HomeGuard, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
