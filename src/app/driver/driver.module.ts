import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DriverComponent } from '../driver/driver.component';
import { PostsService } from '@core/service/posts.service';
import { DriverRoutingModule } from './driver-routing.module';
import { DailogCreateFormComponent } from 'app/popup/dailog-create-form/dailog-create-form.component';


@NgModule({
  declarations: [DriverComponent, DailogCreateFormComponent],
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
