import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeaderService } from '@core/interceptor/header.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit{

  base_api = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // It's not recommended to fetch data directly in the service constructor or OnInit
    // this.getData();
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
    return this.http.post<any>(`${this.base_api}/api/fleet/driver/`, formData );
  }

  deleteData(driverId: string): Observable<any> {
    return this.http.delete<any>(`${this.base_api}/api/fleet/driver/${driverId}`);
  }

  editData(driverId: string, dataForm: any): Observable<any> {
    return this.http.patch<any>(`${this.base_api}/api/fleet/driver/${driverId}/`, dataForm);
  }

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.base_api}/api/fleet/driverimage/upload-image`, formData);
  }

  editImage(formData: FormData) {
    return this.http.patch<any>(`${this.base_api}/api/fleet/driverimage/`, formData);
  }

}
