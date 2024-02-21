import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '@core/service/posts.service';
import { DriverComponent } from 'app/driver/driver.component';

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
  selector: 'app-dailog-create-form',
  templateUrl: './dailog-create-form.component.html',
  styleUrls: ['./dailog-create-form.component.scss']
})
export class DailogCreateFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DriverComponent>,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { dialogRef.disableClose = true; }

  drivers: any;
  edit: boolean = false;
  isDisable: boolean = true;

  dataForm = new FormGroup({
    driving_license_expiration: new FormControl(''),
    id_card: new FormControl(''),
    kh_name: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    phone_no: new FormControl(''),
    photo: new FormControl<File | null | undefined>(null)
  });

  driver: Driver = {
    driving_license_expiration: '',
    id_card: '',
    kh_name: '',
    name: '',
    phone_no: '',
    id: '',
    photo: undefined
  };

  imageSrc: any;

  ngOnInit(): void {
    console.log(this.data)

    if (this.data) {
      this.dataForm.patchValue({
        name: this.data.name,
        kh_name: this.data.kh_name,
        id_card: this.data.id_card,
        driving_license_expiration: this.data.driving_license_expiration,
        phone_no: this.data.phone_no
      });
    }
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

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('photo', this.selectedFile);
      formData.append('driving_license_expiration', this.dataForm.controls.driving_license_expiration.value || '');
      formData.append('id_card', this.dataForm.controls.id_card.value || '');
      formData.append('kh_name', this.dataForm.controls.kh_name.value || '');
      formData.append('name', this.dataForm.controls.name.value || '');
      formData.append('phone_no', this.dataForm.controls.phone_no.value || '');

      this.postsService.postData(formData).subscribe(
        (response) => {
          console.log('Data with image uploaded successfully!', response);
          this.getData();
        },
        (error) => {
          console.error('Error uploading data with image:', error);
        }
      );
    } else {
      console.error('No file selected.');
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

  clearImage() {
    this.selectedFile = null;
    this.imageSrc = null;
    const fileInput: any = document.getElementById('photo');
    fileInput.value = '';
  }

  postData() {
    console.log("Posting Data");
    if (this.selectedFile) {
      this.onUpload();
    } else {
      const formData = this.dataForm.value;

      this.postsService.postData(formData).subscribe(response => {
        console.log('Response:', response);
        this.getData();
      }, error => {
        console.error('Error:', error);
      });
    }
  }

  getData() {
    this.postsService.getData()
      .subscribe(response => {
        console.log('response', response);
        this.drivers = response.results;
      });
  }

  updateData() {
    if (this.data) {
      if (this.selectedFile) {
        console.log('run')
        const formData = new FormData();
        formData.append('photo', this.selectedFile);
        formData.append('driving_license_expiration', this.dataForm.controls.driving_license_expiration.value || '');
        formData.append('id_card', this.dataForm.controls.id_card.value || '');
        formData.append('kh_name', this.dataForm.controls.kh_name.value || '');
        formData.append('name', this.dataForm.controls.name.value || '');
        formData.append('phone_no', this.dataForm.controls.phone_no.value || '');
  
        this.postsService.editImage(formData).subscribe(
          (response: any) => {
            console.log('Driver updated successfully with image!');
            const updatedDriver = { ...this.dataForm.value, photo: response.photo };
            this.updateDriverInList(updatedDriver);
            this.dialogRef.close(); // Close the dialog after updating
          },
          (error: any) => {
            console.error('Error updating driver with image:', error);
          }
        );
      } else {
        const dataFormValue = this.dataForm.value;
  
        this.postsService.editData(this.data.id, dataFormValue).subscribe(
          () => {
            console.log('Driver updated successfully without changing image');
            this.updateDriverInList(dataFormValue);
            this.dialogRef.close(); // Close the dialog after updating
          },
          (error: any) => {
            console.error('Error updating driver:', error);
          }
        );
      }
    } else {
      console.error('No driver data received.');
    }
  }
  
  private updateDriverInList(updatedDriver: any) {
    const index = this.drivers.findIndex((d: any) => d.id === this.data.id);
    if (index !== -1) {
      this.drivers[index] = { ...this.drivers[index], ...updatedDriver };
      this.getData(); // Refresh the data list
    }
  }
  
  editData(driver: Driver) {
    this.edit = true;
    this.dataForm.patchValue({
      name: driver.name,
      kh_name: driver.kh_name,
      id_card: driver.id_card,
      driving_license_expiration: driver.driving_license_expiration,
      phone_no: driver.phone_no
    });
  
    this.imageSrc = driver.photo;
  }
}
