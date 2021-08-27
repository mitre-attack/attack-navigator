import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFrameworkImportComponent } from './control-framework-import.component'

describe('ControlFrameworkImportComponent', () => {
  let component: ControlFrameworkImportComponent;
  let fixture: ComponentFixture<ControlFrameworkImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlFrameworkImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlFrameworkImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
