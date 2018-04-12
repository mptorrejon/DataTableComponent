import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableComponent } from '../Components/datatable/datatable.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataTableService } from '../Components/datatable/datatable.service';
import { DataTableData } from '../Components/datatable/datatable.data';
import { DataTableProps } from '../Components/datatable/datatable.props';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ 
    DataTableService, 
    DataTableProps,
    DataTableData
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){}
}
