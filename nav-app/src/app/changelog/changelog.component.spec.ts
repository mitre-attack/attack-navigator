import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangelogComponent } from './changelog.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ChangelogComponent', () => {
    let component: ChangelogComponent;
    let fixture: ComponentFixture<ChangelogComponent>;
    let markdownService: MarkdownService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatDialogModule, MarkdownModule.forRoot({ loader: HttpClient }), ChangelogComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { someData: 'test data' } },
                { provide: MatDialogRef, useValue: {} },
                MarkdownService,
                provideHttpClient(withInterceptorsFromDi()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ChangelogComponent);
        component = fixture.componentInstance;
        markdownService = TestBed.inject(MarkdownService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should inject MAT_DIALOG_DATA', () => {
        expect(component.data).toEqual({ someData: 'test data' });
    });

    it('should inject MarkdownService', () => {
        expect(markdownService).toBeTruthy();
    });

    it('should inject MatDialog', () => {
        expect(component['dialog']).toBeTruthy();
    });
});
