import { TestBed } from '@angular/core/testing';

import { Icons, IconsService } from './icons.service';

describe('IconsService', () => {
    let service: IconsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IconsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register', () => {
        spyOn(service.matIconRegistry, 'addSvgIcon');
        service.registerIcons();
        expect(service.matIconRegistry.addSvgIcon).toHaveBeenCalledTimes(Object.values(Icons).length);
    });
});
