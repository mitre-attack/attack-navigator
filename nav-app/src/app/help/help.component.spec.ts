import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { HelpComponent } from './help.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayerInformationComponent } from '../layer-information/layer-information.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;
    let markdownService: MarkdownService;
    let renderer: Renderer2;
    let dialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatDialogModule, MarkdownModule.forRoot({ loader: HttpClient }), HelpComponent, LayerInformationComponent],
            providers: [
                Renderer2,
                { provide: MAT_DIALOG_DATA, useValue: { theme: 'dark' } },
                { provide: MatDialogRef, useValue: {} },
                MarkdownService,
                provideHttpClient(withInterceptorsFromDi()),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        markdownService = TestBed.inject(MarkdownService);
        renderer = TestBed.inject(Renderer2);
        dialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should inject MAT_DIALOG_DATA', () => {
        expect(component.data).toEqual({ theme: 'dark' });
    });

    it('should inject MarkdownService', () => {
        expect(markdownService).toBeTruthy();
    });

    it('should inject Renderer2', () => {
        expect(renderer).toBeTruthy();
    });

    it('should inject MatDialog', () => {
        expect(component['dialog']).toBeTruthy();
    });

    it('should initialize headingAnchors in ngOnInit', () => {
        expect(component.headingAnchors).toEqual([]);
        component.ngOnInit();
        expect(component.headingAnchors).toBeDefined();
    });

    it('should clean up listenObj on ngOnDestroy', () => {
        component['listenObj'] = jasmine.createSpy();
        component.ngOnDestroy();
        expect(component['listenObj']).toHaveBeenCalled();
    });

    it('should call scrollIntoView when element exists', () => {
        const mockElement = document.createElement('div');
        spyOn(document, 'querySelector').and.returnValue(mockElement);
        spyOn(mockElement, 'scrollIntoView');
        component.scrollTo('toc');
        expect(document.querySelector).toHaveBeenCalledWith('.toc');
        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
    });

    it('should not call scrollIntoView when element does not exist', () => {
        spyOn(document, 'querySelector').and.returnValue(null);
        const scrollSpy = spyOn(window, 'scrollTo');
        component.scrollTo('toc');
        expect(document.querySelector).toHaveBeenCalledWith('.toc');
        expect(scrollSpy).not.toHaveBeenCalled();
    });

    it('should open the dialog with LayerInformationComponent', () => {
        spyOn(dialog, 'open').and.callThrough();
        component.openLayerDialog();
        expect(dialog.open).toHaveBeenCalled();
    });

    it('should hijack cliks on links in onMarkdownLoad', () => {
        const mockElement = document.createElement('div');
        spyOn(component.markdownElement, 'element').and.returnValue({ nativeElement: mockElement });
        spyOn(component['renderer'], 'listen').and.callFake(() => () => {});
        component.onMarkdownLoad({});
        expect(component['renderer'].listen).toHaveBeenCalled();
    });

    it('should handle anchor link click in onMarkdownLoad', () => {
        const mockEvent = {
            target: { tagName: 'A', getAttribute: () => '#anchor-link' },
            preventDefault: jasmine.createSpy('preventDefault'),
        } as any;

        const mockElement = document.createElement('div');
        spyOn(component.markdownElement, 'element').and.returnValue({ nativeElement: mockElement });
        spyOn(component['renderer'], 'listen').and.callFake((_, __, callback) => {
            callback(mockEvent);
            return () => {};
        });
        spyOn(component, 'scrollTo');

        component.onMarkdownLoad({});

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(component.scrollTo).toHaveBeenCalledWith('anchor-link');
    });
});
