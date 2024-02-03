import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HelpComponent } from './help.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownService, MarkdownModule } from 'ngx-markdown';
import { Renderer2 } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;
    let markdownService: MarkdownService;
    let dialog: MatDialog;
    let renderer: Renderer2;
    let mockMarkdownElement: any;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatDialogModule, MarkdownModule.forRoot({ loader: HttpClient }), BrowserAnimationsModule],
            declarations: [HelpComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                MarkdownService,
                {
                    provide: Renderer2,
                    useValue: {
                        listen: jasmine.createSpy('listen').and.returnValue(() => {}),
                    },
                },
            ],
        }).compileComponents();
        dialog = TestBed.inject(MatDialog);
        markdownService = TestBed.inject(MarkdownService);
        renderer = TestBed.inject(Renderer2);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);
        mockMarkdownElement = {
            element: {
                nativeElement: document.createElement('div'),
            },
        };
        component['markdownElement'] = mockMarkdownElement;
        spyOn(renderer, 'listen').and.callFake((elem, eventName, callback) => {
            return () => {};
        });
        fixture.detectChanges();
        spyOn(component, 'scrollTo').and.callThrough();
        spyOn(dialog, 'open').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnDestroy', () => {
        it('should remove event listeners if any', () => {
            component['listenObj'] = jasmine.createSpy();
            component.ngOnDestroy();
            expect(component['listenObj']).toHaveBeenCalled();
        });
    });

    describe('scrollTo', () => {
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
    });

    describe('openLayerDialog', () => {
        it('should open the dialog with LayerInformationComponent', () => {
            component.openLayerDialog();
            expect(dialog.open).toHaveBeenCalled();
        });
    });

    describe('onMarkdownLoad', () => {
        it('should set up click listener on markdown element', () => {
            component.onMarkdownLoad(null);
            expect(renderer.listen).toHaveBeenCalled();
        });
    });

    describe('MarkdownService renderer overrides', () => {
        it('should override heading renderer', () => {
            const mockHeading = 'Heading';
            const level = 1;
            markdownService.renderer.heading(mockHeading, level, null, null);
            expect(component.headingAnchors.length).toBeGreaterThan(0);
        });

        it('should override html renderer', () => {
            const mockHtml = '<div></div>';
            markdownService.renderer.html(mockHtml);
        });
    });
});
