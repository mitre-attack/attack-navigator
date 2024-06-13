import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCcoverageTableComponent } from './dccoverage-table.component';

describe('DCcoverageTableComponent', () => {
  let component: DCcoverageTableComponent;
  let fixture: ComponentFixture<DCcoverageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCcoverageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DCcoverageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
