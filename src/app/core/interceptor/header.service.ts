import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({ headers: req.headers.append('Authorization', 'sid e214ab45f9e20e70730c41b85b39c6d89a7a26e3') });
    return next.handle(modifiedRequest);
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.auth.getToken()}`
  //     }
  //   });
  //   return next.handle(request);
  // }
  
}
