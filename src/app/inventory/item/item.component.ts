// item.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  name = 'Angular';
  jsonData: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';
  rows = [{id:1, name: '', age: '', gender: '', grade: '', kh_name: '', isNew: true }];

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
    return 'Your data will be lost!';
  }

  addNewRow() {
    const newRowId = this.rows.length + 1;
    this.rows.push({ id: newRowId, name: '', age: '', gender: '', kh_name: '', grade: '', isNew: true });
  }

  saveRow(index: number) {
    if (!this.isRowValid(this.rows[index])) {
      return;
    }
    this.rows[index].isNew = false;
    this.showAlertMessage('Saved successfully!');
    console.log("Saved row:", this.rows[index]);
  }

  editRow(index: number) {
    this.rows[index].isNew = false; 
    this.showAlertMessage('Row edited successfully.');
    console.log("Editing row:", this.rows[index]);
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

  cancelRow(index: number) {
    if (this.rows[index].isNew) {
      this.rows.splice(index, 1);
    } else {
      this.rows[index].isNew = true;
    }
  }

  isRowValid(row: any): boolean {
    return row.name && row.age && row.gender && row.kh_name && row.grade;
  }

  showDataAsJson() {
    this.jsonData = JSON.stringify(this.rows, null, 1);
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000); 
  }

}
