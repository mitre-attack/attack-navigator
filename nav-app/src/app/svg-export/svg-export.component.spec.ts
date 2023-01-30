import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgExportComponent } from './svg-export.component';

describe('SvgExportComponent', () => {
    let component: SvgExportComponent;
    let fixture: ComponentFixture<SvgExportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SvgExportComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SvgExportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
