import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostsService } from '@core/service/posts.service';
import { DailogCreateFormComponent } from 'app/popup/dailog-create-form/dailog-create-form.component';

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

  edit: boolean = false
  isDisable: boolean = true

  dataForm = new FormGroup({
    driving_license_expiration: new FormControl(''),
    id_card: new FormControl(''),
    kh_name: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone_no: new FormControl(''),
    photo: new FormControl<File | null | undefined>(null)
  });

  imageSrc: any;

  constructor(private postsService:PostsService, public dialog: MatDialog) { }

  openCreate(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DailogCreateFormComponent, {
      disableClose: true,
      width: '900px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onEditImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);
      formData.append('driving_license_expiration', this.dataForm.controls.driving_license_expiration.value || '');
      formData.append('id_card', this.dataForm.controls.id_card.value || '');
      formData.append('kh_name', this.dataForm.controls.kh_name.value || '');
      formData.append('name', this.dataForm.controls.name.value || '');
      formData.append('phone_no', this.dataForm.controls.phone_no.value || '');

      this.postsService.editImage(formData).subscribe(
        (response) => {
          console.log('Data with image edited successfully!', response);
          this.getData();
        },
        (error) => {
          console.error('Error editing data with image:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  getData() {
    this.postsService.getData()
      .subscribe(response => {
        console.log('response', response);
        this.drivers = response.results;
      });
  }

  deleteData(driver: Driver) {
    console.log(driver.id);
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

  updateData() {
    console.log('hi')
    if (this.selectedFile) {
      this.onEditImage();
    } else {
      let dataForm1 = {
        "name": this.dataForm.controls.name.value,
        "kh_name": this.dataForm.controls.kh_name.value,
        "id_card": this.dataForm.controls.id_card.value,
        "driving_license_expiration": this.dataForm.controls.driving_license_expiration.value,
        "phone_no": this.dataForm.controls.phone_no.value,
      };

      this.postsService.editData(this.driver.id, dataForm1).subscribe(
        () => {
          console.log('Driver updated successfully without changing image');
          const index = this.drivers.findIndex((d: { id: string; }) => d.id === this.driver.id);
          if (index !== -1) {
            this.drivers[index] = { ...this.drivers[index], ...dataForm1 };
          }
          this.getData(); 
        },
        error => {
          console.error('Error updating driver:', error);
        }
      );
    }
  }


  openEdit(driver: Driver): void {
    this.dialog.open(DailogCreateFormComponent, {
      disableClose: true,
      width: '900px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration:'300ms',
      data:driver
    });
  }


}
