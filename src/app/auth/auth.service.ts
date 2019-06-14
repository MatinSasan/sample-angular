import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  getIdToken() {
    return firebase.auth().currentUser.getIdToken();
  }

  constructor() {}
}
