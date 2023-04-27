import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
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
