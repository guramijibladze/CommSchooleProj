import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { SignInForm } from '../auth/sign-in/sign-in.component';
import { SignUpForm } from '../auth/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  signIn({email, password}: SignInForm){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp({email, password}: SignUpForm){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.auth.signOut();
  }
}
