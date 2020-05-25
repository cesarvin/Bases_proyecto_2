import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user, pass) {
        return this.http.post<any>('http://localhost:3000/login', { user, pass })
            .pipe(map(login => {
              console.log('login->', login);  
              if (login.login == 1){
                localStorage.setItem('currentUser', login.login);
                localStorage.setItem('accountid', login.accountid);
                localStorage.setItem('menu', JSON.stringify(login.menu));
              }else {

              }
              return login.menu;
          }));
    }

    

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accountid');
        this.currentUserSubject.next(null);
    }
}