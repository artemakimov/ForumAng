import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProvider } from 'firebase/auth';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat';
import User = firebase.User;
import UserCredential = firebase.auth.UserCredential

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authState: Observable<auth.User>;
  public currentUserEmail: string;
  public currentUserId: string;
  public authGuardPipe: Observable<auth.User>;
  public UserEmail: string;

  constructor(
    public ngFireAuth: AngularFireAuth
  ) {
    this.authGuardPipe = ngFireAuth.authState;
    this.authGuardPipe.pipe(map((user) => user?.email)).subscribe((email) => {
      if (email) {
        this.currentUserEmail = email;
      } else {
        this.currentUserEmail = email;
      }
    });
  }

  public signIn(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  public signUp(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public authLogin(provider: AuthProvider) {
    return this.ngFireAuth.signInWithPopup(provider);
  }

  public signOut(): Promise<void> {
    return this.ngFireAuth.signOut();
  }

  public googleAuth(): Promise<UserCredential> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  public facebookAuth(): Promise<UserCredential> {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  public githubAuth(): Promise<UserCredential> {
    return this.authLogin(new auth.GithubAuthProvider());
  }

  public getAuthState(): Observable<User>{
    return this.ngFireAuth.authState;
  }

}
