import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements HttpInterceptor {

  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // const currentUser = this.authenticationService.currentUserValue;
    if (localStorage.getItem('sid')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'sid ' + localStorage.getItem('sid'),
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: 'sid ' + environment.token,
        },
      })
    }
    return next.handle(request);
  }

}
