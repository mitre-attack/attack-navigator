import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VersionMismatchComponent } from './version-mismatch.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarkdownService, MarkdownModule } from "ngx-markdown";
describe('VersionMismatchComponent', () => {
  let component: VersionMismatchComponent;
  let fixture: ComponentFixture<VersionMismatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MarkdownModule.forRoot()
      ],
      declarations: [ VersionMismatchComponent ],
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
    fixture = TestBed.createComponent(VersionMismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
