import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ItemComponent } from './item/item.component';
import { WhereHouseComponent } from './where-house/where-house.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [InventoryComponent, ItemComponent, WhereHouseComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatPaginatorModule
  ],
  providers:[
    
  ]
})
export class InventoryModule { }
