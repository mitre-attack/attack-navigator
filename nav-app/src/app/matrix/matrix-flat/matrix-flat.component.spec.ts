import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatrixFlatComponent } from './matrix-flat.component';

describe('MatrixFlatComponent', () => {
  let component: MatrixFlatComponent;
  let fixture: ComponentFixture<MatrixFlatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixFlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
