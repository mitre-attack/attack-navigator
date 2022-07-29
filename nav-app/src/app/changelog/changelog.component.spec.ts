import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ChangelogComponent } from './changelog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarkdownComponent, MarkdownService, MarkdownModule } from "ngx-markdown";
describe('ChangelogComponent', () => {
  let component: ChangelogComponent;
  let fixture: ComponentFixture<ChangelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MarkdownModule.forRoot()
      ],
      declarations: [ ChangelogComponent ],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
