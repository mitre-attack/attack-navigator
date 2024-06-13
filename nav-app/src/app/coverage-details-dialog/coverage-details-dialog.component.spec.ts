import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDetailsDialogComponent } from './coverage-details-dialog.component';

describe('CoverageDetailsDialogComponent', () => {
  let component: CoverageDetailsDialogComponent;
  let fixture: ComponentFixture<CoverageDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
