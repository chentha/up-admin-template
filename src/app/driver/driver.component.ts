import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '@core/service/posts.service';

interface Driver {
  photo: any;
  id: string;
  driving_license_expiration: string;
  id_card: string;
  kh_name: string;
  name: string;
  phone_no: string;
}
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  drivers: any;

  driver: Driver = {
    driving_license_expiration: '',
    id_card: '',
    kh_name: '',
    name: '',
    phone_no: '',
    id: '',
    photo: undefined
  };

  ngOnInit(): void {
    this.getData()
  }

  constructor(private http: HttpClient, private postsService:PostsService) { }

  getData() {
    this.postsService.getData()
      .subscribe(response => {
        console.log('response', response);
        this.drivers = response.results;
      });
  }
}
