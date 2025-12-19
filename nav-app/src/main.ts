import { enableProdMode, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { Title, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ConfigService } from './app/services/config.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ColorPickerDirective } from 'ngx-color-picker';
import { DndModule } from 'ngx-drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MarkdownModule } from 'ngx-markdown';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app/app.component';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
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
            ColorPickerDirective,
            DndModule,
            MatSidenavModule,
            MatCardModule,
            MatDividerModule,
            MatStepperModule,
            MatPaginatorModule,
            MarkdownModule.forRoot(),
            MatTabsModule
        ),
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
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ],
}).catch((err) => console.log(err));
