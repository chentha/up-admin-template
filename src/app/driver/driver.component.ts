import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '@core/service/posts.service';
import { DailogCreateFormComponent } from 'app/popup/dailog-create-form/dailog-create-form.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  drivers: Driver[] = [];
  @Input() refreshing = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: any;

  constructor(private postsService: PostsService, public dialog: MatDialog) {
    this.postsService.refreshNeeded$.subscribe(()=>{
      this.getData()
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  driver: Driver = {
    driving_license_expiration: '',
    id_card: '',
    kh_name: '',
    name: '',
    phone_no: '',
    id: '',
    photo: undefined
  };

  currentPage = 0;
  itemsPerPage = 10;
  totalItems = 0;

  ngOnChanges(): void {
    if (this.refreshing) {
      this.getData();
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

  getPaginatedData(): Driver[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.drivers.slice(startIndex, endIndex);
  }

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
        this.totalItems = this.drivers.length;
      });
  }

  deleteData(driver: Driver) {
    this.postsService.deleteData(driver.id).subscribe(
      () => {
        console.log('Driver deleted successfully');
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
