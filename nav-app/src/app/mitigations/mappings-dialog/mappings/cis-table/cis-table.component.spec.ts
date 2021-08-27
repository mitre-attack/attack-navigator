/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CisTableComponent } from './cis-table.component';

describe('CisTableComponent', () => {
  let component: CisTableComponent;
  let fixture: ComponentFixture<CisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CisTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
