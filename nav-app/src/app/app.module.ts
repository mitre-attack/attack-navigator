import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map'

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { DataTableComponent } from './datatable/data-table.component';
import { TabsComponent } from './tabs/tabs.component';
import { HelpComponent } from './help/help.component';
import { ExporterComponent } from './exporter/exporter.component';
import { TechniqueCellComponent } from './matrix/technique-cell/technique-cell.component';
import { MatrixSideComponent } from './matrix/matrix-side/matrix-side.component';
import { MatrixFlatComponent } from './matrix//matrix-flat/matrix-flat.component';
import { MatrixMiniComponent } from './matrix//matrix-mini/matrix-mini.component';
import { TooltipComponent } from './matrix/technique-cell/tooltip/tooltip.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { TechniquesSearchComponent } from './techniques-search/techniques-search.component';
import { ContextmenuComponent } from './matrix/technique-cell/contextmenu/contextmenu.component';
import { TacticCellComponent } from './matrix/tactic-cell/tactic-cell.component';
import { VersionUpgradeComponent } from './version-upgrade/version-upgrade.component';
import { MitigationsComponent } from './mitigations/mitigations.component';
import { ControlFrameworkImportComponent } from './control-framework/control-framework-import/control-framework-import.component';
import { ExportDialogComponent, ExportDialogButtonComponent } from './mitigations/export-dialog/export-dialog.component';
import { MappingsDialogComponent, MappingsDialogButtonComponent } from './mitigations/mappings-dialog/mappings-dialog.component';
import { MatListModule } from '@angular/material/list';
import { AsvsTableComponent } from './mitigations/mappings-dialog/mappings/asvs-table/asvs-table.component';
import { CisTableComponent } from './mitigations/mappings-dialog/mappings/cis-table/cis-table.component';
import { NistMappingsComponent } from './mitigations/mappings-dialog/mappings/nist-mappings/nist-mappings.component';
import { TechniqueMappingsComponent } from './mitigations/technique-mappings/technique-mappings.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    TabsComponent,
    HelpComponent,
    ExporterComponent,
    TechniqueCellComponent,
    MatrixSideComponent,
    MatrixFlatComponent,
    MatrixMiniComponent,
    TooltipComponent,
    MultiselectComponent,
    TechniquesSearchComponent,
    ContextmenuComponent,
    TacticCellComponent,
    VersionUpgradeComponent,
    MitigationsComponent,
    ControlFrameworkImportComponent,
    MappingsDialogComponent,
    MappingsDialogButtonComponent,
    ExportDialogComponent,
    ExportDialogButtonComponent,
    AsvsTableComponent,
    CisTableComponent,
    NistMappingsComponent,
    TechniqueMappingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    ColorPickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatButtonToggleModule,
    MatListModule,
    MatCheckboxModule,
    MatTabsModule
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
  entryComponents: [ VersionUpgradeComponent, HelpComponent, ExporterComponent ]
})
export class AppModule { }
