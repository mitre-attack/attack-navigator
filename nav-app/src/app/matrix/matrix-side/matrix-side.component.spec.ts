import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatrixSideComponent } from './matrix-side.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
describe('MatrixSideComponent', () => {
  let component: MatrixSideComponent;
  let fixture: ComponentFixture<MatrixSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
        MatDialogModule 
      ],
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
