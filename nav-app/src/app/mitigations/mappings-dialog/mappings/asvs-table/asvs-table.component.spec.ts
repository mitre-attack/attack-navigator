/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsvsTableComponent } from './asvs-table.component';

describe('AsvsTableComponent', () => {
  let component: AsvsTableComponent;
  let fixture: ComponentFixture<AsvsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AsvsTableComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsvsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
