import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from '.';
import { User, Game } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService
  ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

  login(username, password) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          if (user.msg === 'Invalid Credential') {
            this.alertService.error(user.msg);
            catchError(err => of([]))
          } else {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          }
        })
      );
  }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

  getAllGames(): any {
    if (!this.headers.get('Authorization')) {
      this.headers = this.headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('user')).token);
    }
    return this.http.get<Game[]>(`${environment.apiUrl}/api/games`, {headers: this.headers});
  }

}
