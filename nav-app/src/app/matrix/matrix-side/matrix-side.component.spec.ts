import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatrixSideComponent } from './matrix-side.component';

describe('MatrixSideComponent', () => {
  let component: MatrixSideComponent;
  let fixture: ComponentFixture<MatrixSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
