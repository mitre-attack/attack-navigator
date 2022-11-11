import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HelpComponent } from './help.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { MarkdownComponent, MarkdownService, MarkdownModule } from "ngx-markdown";
describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  var mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed'])
  var mockViewModel = jasmine.createSpyObj('ViewModel', { uid: 'uidValue' }, { legendItems: [] })

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpComponent ],
      imports: [ MatDialogModule, HttpClientTestingModule ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { vm: mockViewModel } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
