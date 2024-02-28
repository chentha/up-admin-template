import { Component } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  name = 'Angular';
  jsonData: string = '';
  editedRows: any[] = [];
  searchText: string = '';

  rows = [
    { id: 1, name: '1', age: '1', gender: 'male', kh_name: '1', grade: '1', isNew: false, saved: true, editing: false },
    { id: 2, name: '2', age: '2', gender: 'male', kh_name: '2', grade: '2', isNew: false, saved: true, editing: false }
  ];
 
  currentPage = 1;
  itemsPerPage = 10;

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }

  addNewRow() {
    const newRowId = this.rows.length;
    this.rows.push({ id: newRowId, name: '', age: '', gender: '', kh_name: '', grade: '', isNew: true, saved: false, editing: true });
  }  
  
  allInputsFilled(index: number): boolean {
    const row = this.rows[index];
    return !!row.name && !!row.age && !!row.gender && !!row.kh_name && !!row.grade;
  }

  saveRow(index: number) {
    if (!this.isRowValid(this.rows[index])) {
      return;
    }
    this.rows[index].isNew = true;
    this.rows[index].saved = true;
    this.rows[index].editing = false;
    console.log("Saved row:", this.rows[index]);
  }

  editRow(index: number) {
    this.rows[index].editing = true;
    this.editedRows[index] = { ...this.rows[index] };
    console.log("Editing row:", this.rows[index]);
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

  cancelRow(index: number) {
    if (this.rows[index].isNew) {
      this.rows.splice(index, 1);
    } else {
      this.rows[index] = { ...this.editedRows[index] };
      this.rows[index].saved = false;
      this.rows[index].editing = false;
    }
  }

  isRowValid(row: any): boolean {
    return row.name && row.age && row.gender && row.kh_name && row.grade;
  }

  showDataAsJson() {
    const dataToDisplay = this.rows.map(({ id, name, age, gender, kh_name, grade, isNew }) => {
      if (isNew) {
        return { name, age, gender, kh_name, grade, isNew };
      }else{
        return { id, name, age, gender, kh_name, grade, isNew };
      }
    });
    this.jsonData = JSON.stringify(dataToDisplay, null, 2);
  }

  getFilteredAndPaginatedRows() {
    const filteredRows = this.rows.filter(row =>
      row.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.age.toString().includes(this.searchText) ||
      row.gender.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.kh_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.grade.toString().includes(this.searchText)
    );

    return filteredRows.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }
  
}
