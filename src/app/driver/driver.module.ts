import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DriverComponent } from '../driver/driver.component';
import { PostsService } from '@core/service/posts.service';
import { DriverRoutingModule } from './driver-routing.module';


@NgModule({
  declarations: [DriverComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    PostsService
  ]
})
export class DriverModule { }
