import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExporterComponent } from './exporter.component';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

describe('ExporterComponent', () => {
  let component: ExporterComponent;
  let fixture: ComponentFixture<ExporterComponent>;

  beforeEach(() => {
    var mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])
    var mockViewModel = jasmine.createSpyObj('ViewModel', { uid: 'uidValue' }, { legendItems: [] })
    var mockDomain = jasmine.createSpyObj('Domain', { matrices: new Array() })
    var mockHttpObservable = {}
    mockHttpObservable["subscribe"] = function () { return mockHttpObservable }
    mockHttpObservable["next"] = function () { return mockHttpObservable }

    var mockDataService = { getDomain: () => mockDomain, getConfig: () => mockHttpObservable }

    TestBed.configureTestingModule({
      declarations: [ExporterComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { vm: mockViewModel } },
        { provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
