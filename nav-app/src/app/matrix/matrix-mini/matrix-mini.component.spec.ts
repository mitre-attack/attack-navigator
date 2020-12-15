import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatrixMiniComponent } from './matrix-mini.component';

describe('MatrixMiniComponent', () => {
  let component: MatrixMiniComponent;
  let fixture: ComponentFixture<MatrixMiniComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
