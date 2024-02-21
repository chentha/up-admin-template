import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '@core/service/posts.service';
import { DriverComponent } from 'app/driver/driver.component';
import { Subject, BehaviorSubject, tap, exhaustMap } from 'rxjs';

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
export class DailogCreateFormComponent implements OnInit, OnChanges {
  service: any;
  refreshing: any;

  constructor(
    public dialogRef: MatDialogRef<DriverComponent>,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { dialogRef.disableClose = true; }
 
  edit: boolean = false;
  isDisable: boolean = true;

  dataForm = new FormGroup({
    driving_license_expiration: new FormControl('', [Validators.required]),
    id_card: new FormControl('', [Validators.required]),
    kh_name: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required]),
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
      this.edit = true
      this.isDisable = true
      this.dataForm.patchValue({
        name: this.data.name,
        kh_name: this.data.kh_name,
        id_card: this.data.id_card,
        driving_license_expiration: this.data.driving_license_expiration,
        phone_no: this.data.phone_no,
      });
    }
  }

  ngOnChanges() {
    console.log('In toolbar', this.refreshing);
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
        },
        (error) => {
          console.error('Error uploading data with image:', error);
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
        // window.location.reload();
        console.log('Response:', response); 
      }, error => {
        console.error('Error:', error);
      });
    }
  }
 

  updateData() {
    if (!this.data) {
      console.error('No driver data received.');
      this.edit = true;
      return;
    }
  
    const formData = new FormData();
    formData.append('photo', this.selectedFile || '');
    formData.append('driving_license_expiration', this.dataForm.controls.driving_license_expiration.value || '');
    formData.append('id_card', this.dataForm.controls.id_card.value || '');
    formData.append('kh_name', this.dataForm.controls.kh_name.value || '');
    formData.append('name', this.dataForm.controls.name.value || '');
    formData.append('phone_no', this.dataForm.controls.phone_no.value || '');
  
    this.postsService.editData(this.data.id, formData).subscribe(
      (response: any) => {
        console.log('Driver updated successfully!');
        // const updatedDriver = { ...this.dataForm.value, photo: response.photo }; 
        this.dialogRef.close();
      },
      (error: any) => {
        console.error('Error updating driver:', error);
      }
    );
  }
 
  
  editData(driver: Driver) {
    this.edit = true;
    this.dataForm.patchValue({
      name: driver.name,
      kh_name: driver.kh_name,
      id_card: driver.id_card,
      driving_license_expiration: driver.driving_license_expiration,
      phone_no: driver.phone_no,
      photo: driver.photo 
    });
    this.imageSrc = driver.photo;
  }
}
