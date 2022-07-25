/* eslint-disable guard-for-in */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, identity } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map, tap, take, switchMap } from 'rxjs/operators';

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
  userId?: string;
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
    let user1: User;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(take(1),switchMap((userData) => {
      const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
      user1 = new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime,
        user.name,
        user.surname
        );

         return this.http.post<{ name: string }>(
           `https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${user1.token}`,
           {
             firstName: user1.firstName,
             lastName: user1.lastName,
             userId: user1.id,
           }
         );
      //this._user.next(user1);
    }),
     take(1),
     tap(() => {
       this._user.next(user1);
     })
    );

  }

  login(user: UserData) {
    this._isUserAutheticated = true;
    let user1: User;
    let token: string;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(take(1),switchMap((userData) => {
      const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);

      token = userData.idToken;

      user1 = new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime,
        user.name,
        user.surname
        );

        console.log(user1);
        return this.http.get<UserData>(
          `https://mobilno-projekat-f2433-default-rtdb.europe-west1.firebasedatabase.app/users.json?orderBy="userId"&equalTo="${user1.id}"&auth=${user1.token}`
        );
      }),
      map((additionalUserData) => {
        console.log('sdadsa');
        for (const key in additionalUserData) {
          console.log('dsadsads');
          if (additionalUserData.hasOwnProperty(key)) {
            user1.firstN = additionalUserData[key].firstName;
            user1.lastN = additionalUserData[key].lastName;
            console.log('sdads');
          }
        }

      this._user.next(user1);
    }));
  }

  logout() {
    this._user.next(null);
  }

  // private storeAuthData(
  //   userId: string,
  //   email: string,
  //   token: string,
  //   tokenExpirationDate: string,
  //   firstName: string,
  //   lastName: string
  // ) {
  //   const data = JSON.stringify({
  //     userId: userId,
  //     email: email,
  //     token: token,
  //     tokenExpirationDate: tokenExpirationDate,
  //     firstName: firstName,
  //     lastName: lastName,
  //   });
  // }


}
