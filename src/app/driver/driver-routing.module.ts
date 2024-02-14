import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { DriverComponent } from '../driver/driver.component';

const routes: Routes = [
  {
    path: 'driver',
    component: DriverComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {}
