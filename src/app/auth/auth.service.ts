/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, identity } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAutheticated =false;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isUserAutheticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if(user) {
          return !!user.token;
        }else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if(user) {
          return user.id;
        }else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if(user) {
          return user.token;
        }else {
          return null;
        }
      })
    );
  }

  get user() {
    return this._user.asObservable().pipe(
      map((user) => {
        if(user) {
          return user;
        }else {
          return null;
        }
      })
    );
  }

  register(user: UserData) {
    this._isUserAutheticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap((userData) => {
      const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
      const user1 = new User(userData.localId, userData.email, userData.idToken, expirationTime);
      this._user.next(user1);
    }));;
  }

  login(user: UserData) {
    this._isUserAutheticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap((userData) => {
      const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
      const user1 = new User(userData.localId, userData.email, userData.idToken, expirationTime);
      this._user.next(user1);
    }));
  }

  logout() {
    this._user.next(null);
  }
}
