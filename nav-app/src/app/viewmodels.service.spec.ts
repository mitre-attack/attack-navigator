import { TestBed, inject } from '@angular/core/testing';

import { ViewModelsService } from './viewmodels.service';

describe('ViewmodelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewModelsService]
    });
  });

  it('should be created', inject([ViewModelsService], (service: ViewModelsService) => {
    expect(service).toBeTruthy();
  }));
});
