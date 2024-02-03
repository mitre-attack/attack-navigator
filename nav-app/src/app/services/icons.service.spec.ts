import { TestBed, inject } from '@angular/core/testing';

import { Icons, IconsService } from './icons.service';

describe('IconsService', () => {
    let service: IconsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IconsService);
    });

    it('should be created', inject([IconsService], (service: IconsService) => {
        expect(service).toBeTruthy();
    }));

    it('should register', inject([IconsService], (service: IconsService) => {
        spyOn(service.matIconRegistry, 'addSvgIcon');
        service.registerIcons();
		expect(service.matIconRegistry.addSvgIcon).toHaveBeenCalledTimes(Object.values(Icons).length);
    }));
});
