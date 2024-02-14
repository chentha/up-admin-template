import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { ItemComponent } from './item/item.component';
import { WhereHouseComponent } from './where-house/where-house.component';

const routes: Routes = [

  {
    path: 'item',
    component: ItemComponent
  },
  {
    path: 'where-house',
    component: WhereHouseComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
