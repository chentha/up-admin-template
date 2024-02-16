import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  base_api = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username_val: string, password_val: string) {
    return this.http
      .post<User>(this.base_api + '/api/user/login/', {
        "username": username_val , 
        "password" : password_val,
        "login_type": "web"
      })
      // .pipe(
      //   map((user) => {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('currentUser', JSON.stringify(user));
      //     this.currentUserSubject.next(user);
      //     return user;
      //   })
      // );
  }


  // ---------------------------
  // getUserProfile(): Observable<User> {
  //   const token = this.currentUserValue.token;
  //   if (!token) {
  //     return throwError('User is not authenticated.');
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${environment.token}`,
  //   });

  //   return this.http.get<User>(`${environment.apiUrl}/api/user/login/`, { headers }).pipe(
  //     catchError((error) => {
  //       // Handle profile retrieval errors
  //       return throwError(error);
  //     })
  //   );
  // }
  
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('sid');
    this.router.navigate(['/authentication/signin'])
    // this.currentUserSubject.next(this.currentUserValue);
    // return of({ success: false });
  }
}
