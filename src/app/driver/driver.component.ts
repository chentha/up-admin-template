import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '@core/service/posts.service';
import { DailogCreateFormComponent } from 'app/popup/dailog-create-form/dailog-create-form.component';
import { BehaviorSubject, Subject, Subscription, exhaustMap, tap } from 'rxjs';

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
export class DriverComponent implements OnInit, OnChanges {
  drivers: any;
  @Input() refreshing=false;

  driver: Driver = {
    driving_license_expiration: '',
    id_card: '',
    kh_name: '',
    name: '',
    phone_no: '',
    id: '',
    photo: undefined
  };
  service: any;
  refreshData: any;

  constructor(private postsService: PostsService, public dialog: MatDialog) {

    this.postsService.refreshNeeded$.subscribe(()=>{
      this.getData()
    })
  }
 
  ngOnInit(): void {
    this.getData()
  
  }

  ngOnChanges() {
    console.log('In toolbar', this.refreshing);
  }

  isDisable: boolean = true

  dataForm = new FormGroup({
    driving_license_expiration: new FormControl(''),
    id_card: new FormControl(''),
    kh_name: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone_no: new FormControl(''),
    photo: new FormControl<File | null | undefined>(null)
  });


  openCreate(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DailogCreateFormComponent, {
      disableClose: true,
      width: '900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //sort table to all value 
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.drivers.sort((a: any, b: any) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getData() {
    this.postsService.getData()
      .subscribe(response => {
        console.log('response', response);
        this.drivers = response.results;
      });
  }

  deleteData(driver: Driver) {
    this.postsService.deleteData(driver.id).subscribe(
      () => {
        console.log('Driver deleted successfully');
        this.getData();
      },
      error => {
        console.error('Error deleting driver:', error);
      }
    );
  }

  openEdit(driver: Driver): void {
    this.dialog.open(DailogCreateFormComponent, {
      disableClose: true,
      width: '900px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: driver
    });
  }
}
