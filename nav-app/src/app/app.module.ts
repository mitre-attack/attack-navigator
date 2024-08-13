import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

// material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColorPickerModule } from 'ngx-color-picker';
import { DndModule } from 'ngx-drag-drop';
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
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LayerSettingsComponent } from './layer-settings/layer-settings.component';

import { MarkdownModule } from 'ngx-markdown';
import { LayerInformationComponent } from './layer-information/layer-information.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { MatTabsModule } from '@angular/material/tabs';
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
        LayerSettingsComponent,
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
