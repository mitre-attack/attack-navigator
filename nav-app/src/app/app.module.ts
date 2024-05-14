import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import 'rxjs/add/operator/map';

// material
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorPickerModule } from 'ngx-color-picker';
import { DndModule } from 'ngx-drag-drop';
import { PopoverModule } from 'ngx-smart-popover';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataTableComponent } from './datatable/data-table.component';
import { TabsComponent } from './tabs/tabs.component';
import { HelpComponent } from './help/help.component';
import { SvgExportComponent } from './svg-export/svg-export.component';
import { TechniqueCellComponent } from './matrix/technique-cell/technique-cell.component';
import { MatrixSideComponent } from './matrix/matrix-side/matrix-side.component';
import { MatrixFlatComponent } from './matrix//matrix-flat/matrix-flat.component';
import { MatrixMiniComponent } from './matrix//matrix-mini/matrix-mini.component';
import { TooltipComponent } from './matrix/technique-cell/tooltip/tooltip.component';
import { SearchAndMultiselectComponent } from './search-and-multiselect/search-and-multiselect.component';
import { ContextmenuComponent } from './matrix/technique-cell/contextmenu/contextmenu.component';
import { TacticCellComponent } from './matrix/tactic-cell/tactic-cell.component';
import { VersionUpgradeComponent } from './version-upgrade/version-upgrade.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayerUpgradeComponent } from './layer-upgrade/layer-upgrade.component';
import { ChangelogCellComponent } from './layer-upgrade/changelog-cell/changelog-cell.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

import { MarkdownModule } from 'ngx-markdown';
import { LayerInformationComponent } from './layer-information/layer-information.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { ListInputComponent } from './list-input/list-input.component';
import { ConfigService } from './services/config.service';

@NgModule({
    declarations: [
        AppComponent,
        DataTableComponent,
        TabsComponent,
        HelpComponent,
        SvgExportComponent,
        TechniqueCellComponent,
        MatrixSideComponent,
        MatrixFlatComponent,
        MatrixMiniComponent,
        TooltipComponent,
        SearchAndMultiselectComponent,
        ContextmenuComponent,
        TacticCellComponent,
        VersionUpgradeComponent,
        SidebarComponent,
        LayerUpgradeComponent,
        ChangelogCellComponent,
        LayerInformationComponent,
        ChangelogComponent,
        ListInputComponent,
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
        MatIconModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatMenuModule,
        MatExpansionModule,
        MatDialogModule,
        MatSnackBarModule,
        ColorPickerModule,
        DndModule,
        MatSidenavModule,
        MatCardModule,
        MatDividerModule,
        MatStepperModule,
        MatPaginatorModule,
        MarkdownModule.forRoot(),
        PopoverModule,
        MatTabsModule,
    ],
    exports: [MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule, MatExpansionModule, MatTabsModule],
    providers: [
        Title,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: (configService: ConfigService) => {
                return () => configService.loadConfig();
            },
            deps: [ConfigService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
