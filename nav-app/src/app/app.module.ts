import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map'

// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTableComponent } from './datatable/data-table.component';
import { TabsComponent } from './tabs/tabs.component';
import {DynamicTabsDirective} from './tabs/dynamic-tabs.directive';
import { TabComponent } from './tab/tab.component';
import { HelpComponent } from './help/help.component';
import { ExporterComponent } from './exporter/exporter.component';
import { TechniqueCellComponent } from './datatable/technique-cell/technique-cell.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    HelpComponent,
    ExporterComponent,
    TechniqueCellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    ColorPickerModule,
  ],
  exports: [
      MatSelectModule,
      MatInputModule,
      MatButtonModule,
      MatTooltipModule,
      MatMenuModule,
      MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ TabComponent ]
})
export class AppModule { }
