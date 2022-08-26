import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { VersionUpgradeComponent } from './version-upgrade.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
describe('VersionUpgradeComponent', () => {
  let component: VersionUpgradeComponent;
  let fixture: ComponentFixture<VersionUpgradeComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule ,
        MatDialogModule
      ],
      declarations: [ VersionUpgradeComponent ],
      providers: [
     {
       provide: MatDialogRef,
       useValue: {}
     },
     { 
     	provide: MAT_DIALOG_DATA, 
     	useValue: {} 
     }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
