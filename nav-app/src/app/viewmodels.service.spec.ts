import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ViewModelsService } from './viewmodels.service';

describe('ViewmodelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule ,
        MatDialogModule
      ],
      providers: [ViewModelsService]
    });
  });

  it('should be created', inject([ViewModelsService], (service: ViewModelsService) => {
    expect(service).toBeTruthy();
  }));
});
