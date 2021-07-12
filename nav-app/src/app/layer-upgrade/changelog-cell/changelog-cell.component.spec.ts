import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangelogCellComponent } from './changelog-cell.component';

describe('ChangelogCellComponent', () => {
    let component: ChangelogCellComponent;
    let fixture: ComponentFixture<ChangelogCellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangelogCellComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangelogCellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
