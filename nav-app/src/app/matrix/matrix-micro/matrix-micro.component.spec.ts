import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixMicroComponent } from './matrix-micro.component';

describe('MatrixMicroComponent', () => {
  let component: MatrixMicroComponent;
  let fixture: ComponentFixture<MatrixMicroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixMicroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
