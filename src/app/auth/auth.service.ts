import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.store.dispatch(new AuthActions.Signup());
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
            console.log('got the token!');
          });
      })
      .catch(err => console.log(err));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new AuthActions.Signin());
        this.router.navigate(['/']);

        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
            console.log('login: success');
          });
      })
      .catch(err => console.log(err));
  }

  getIdToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => (this.token = token));
    return this.token;
  }

  isAuth() {
    return this.token != null;
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }
}
