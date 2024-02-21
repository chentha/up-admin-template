import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeaderService } from '@core/interceptor/header.service';
import { environment } from 'environments/environment';
import { Observable, Subject, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService{

  base_api = environment.apiUrl;

  constructor(private http: HttpClient) { }

   _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.base_api}/api/fleet/driver/`);
  }

  dataForm = new FormGroup({
    driving_license_expiration: new FormControl(''),
    id_card: new FormControl(''),
    kh_name: new FormControl(''),
    name: new FormControl(''),
    phone_no: new FormControl(''),
    photo: new FormControl<File | null | undefined>(null) 
  });
  drivers: any;

  postData(formData: any): Observable<any>{
    return this.http.post<any>(`${this.base_api}/api/fleet/driver/`, formData )
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  deleteData(driverId: string): Observable<any> {
    return this.http.delete<any>(`${this.base_api}/api/fleet/driver/${driverId}`)
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editData(driverId: string, dataForm: any): Observable<any> {
    return this.http.patch<any>(`${this.base_api}/api/fleet/driver/${driverId}/`, dataForm)
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.base_api}/api/fleet/driverimage/upload-image`, formData)
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

  editImage(formData: FormData) {
    return this.http.patch<any>(`${this.base_api}/api/fleet/driverimage/`, formData)
    .pipe(
      tap(() =>  {
        this._refreshNeeded$.next();
      })
    );
  }

}
