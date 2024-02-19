import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  imports: [CommonModule, MatTabsModule, NgScrollbarModule],
  declarations: []
})
export class LayoutModule {}
