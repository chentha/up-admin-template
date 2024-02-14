import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit{

  base_api = environment.apiUrl

  ngOnInit(): void {
    this.getData()
  }

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.base_api + '/api/fleet/driver/');
  }
}
