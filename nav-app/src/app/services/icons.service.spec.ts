import { TestBed, inject } from '@angular/core/testing';

import { IconsService } from './icons.service';

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
        enum Icons {
            SORT_ALPHABETICAL_ASC = 'ic_sort_alphabetically_ascending',
            SORT_ALPHABETICAL_DESC = 'ic_sort_alphabetically_descending',
            SORT_NUMERICAL_ASC = 'ic_sort_numerically_ascending',
            SORT_NUMERICAL_DESC = 'ic_sort_numerically_descending',
            UNFOLD_MORE_ALT = 'ic_unfold_more_alt',
            NON_STICKY_TOOLBAR = 'ic_push_pin_gray',
        }
        service.registerIcons()
        expect(service.getIcons()).toEqual(Icons);
    }));
});
