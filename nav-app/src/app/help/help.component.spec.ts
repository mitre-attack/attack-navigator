import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelpComponent } from './help.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { MarkdownComponent, MarkdownService, MarkdownModule } from "ngx-markdown";
describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
    	HttpClientModule,
        MatDialogModule,
        MarkdownModule.forRoot({ loader: HttpClient })
      ],
      declarations: [ HelpComponent ],
      providers: [
     {
       provide: MatDialogRef,
       useValue: {}
     },
     { 
     	provide: MAT_DIALOG_DATA, 
     	useValue: {} 
     },
     MarkdownService
     ]
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
