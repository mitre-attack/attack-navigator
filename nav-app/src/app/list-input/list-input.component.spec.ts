import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInputComponent, ListInputConfig } from './list-input.component';
import { Link, Metadata, ViewModel } from '../classes';

class MockLink extends Link {
    serialize = jasmine.createSpy('serialize').and.returnValue({});
    deserialize = jasmine.createSpy('deserialize');
    valid = jasmine.createSpy('valid').and.returnValue(true);
}

class MockMetadata extends Metadata {
    serialize = jasmine.createSpy('serialize').and.returnValue({});
    deserialize = jasmine.createSpy('deserialize');
    vaid = jasmine.createSpy('valid').and.returnValue(true);
}

class MockViewModel extends ViewModel {
    editSelectedTechniqueValues = jasmine.createSpy('editSelectedTechniqueValues');
}

describe('ListInputComponent', () => {
    let component: ListInputComponent;
    let fixture: ComponentFixture<ListInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListInputComponent],
            providers: [
                { provide: Link, useClass: MockLink },
                { provide: Metadata, useClass: MockMetadata },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ListInputComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clone list items for technique level', () => {
        const config: ListInputConfig = {
            viewModel: new MockViewModel('name', 'uid', 'enterprise-attack-13', null),
            list: [new MockLink()],
            type: 'links',
            level: 'technique',
            nameField: 'name',
            valueField: 'value',
        };

        component.config = config;
        component.ngOnInit();

        expect(component.list.length).toBe(config.list.length);
        expect(config.list[0].serialize).toHaveBeenCalled();
    });

    it('should not clone list items for layer level', () => {
        const config: ListInputConfig = {
            viewModel: new MockViewModel('name', 'uid', 'enterprise-attack-13', null),
            list: [new MockLink()],
            type: 'links',
            level: 'layer',
            nameField: 'name',
            valueField: 'value',
        };

        component.config = config;
        component.ngOnInit();

        expect(component.list).toBe(config.list);
        expect(config.list[0].serialize).not.toHaveBeenCalled();
    });

    describe('includeLinks', () => {
        it('should return true if config type is links', () => {
            component.config = { type: 'links' } as ListInputConfig;
            expect(component.includeLinks).toBeTrue();
        });

        it('should return false if config type is not links', () => {
            component.config = { type: 'metadata' } as ListInputConfig;
            expect(component.includeLinks).toBeFalse();
        });
    });

    describe('add', () => {
        it('should add a new item to the list', () => {
            component.config = { type: 'links' } as ListInputConfig;
            component.list = [];
            component.add();

            expect(component.list.length).toBe(1);
            expect(component.list[0] instanceof Link).toBeTrue();
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            const config: ListInputConfig = {
                viewModel: new MockViewModel('name', 'uid', 'enterprise-attack-13', null),
                list: [new MockLink()],
                type: 'links',
                level: 'technique',
                nameField: 'name',
                valueField: 'value',
            };
            component.config = config;
            component.list = [new MockLink(), new MockLink(), new MockLink()];
        });

        it('should remove an item from the list', () => {
            component.remove(1);
            expect(component.list.length).toBe(2);
        });

        it('should remove two items if adjacent items are dividers', () => {
            component.list[1].divider = true;
            component.remove(2);
            expect(component.list.length).toBe(1);
        });

        it('should call removeDivider if the first item is a divider', () => {
            spyOn(component, 'removeDivider');
            component.list[0].divider = true;
            component.remove(1);
            expect(component.removeDivider).toHaveBeenCalledWith(0);
        });

        it('should call removeDivider if the last item is a divider', () => {
            spyOn(component, 'removeDivider');
            component.list[2].divider = true;
            component.remove(1);
            expect(component.removeDivider).toHaveBeenCalledWith(1);
        });
    });

    describe('updateList', () => {
        it('should filter and update the list of valid items', () => {
            const config: ListInputConfig = {
                viewModel: new MockViewModel('name', 'uid', 'enterprise-attack-13', null),
                list: [new MockLink(), new MockLink()],
                type: 'links',
                level: 'technique',
                nameField: 'name',
                valueField: 'value',
            };
            component.config = config;
            component.list = config.list;
            component.updateList();
            expect(config.viewModel.editSelectedTechniqueValues).toHaveBeenCalled();
        });
    });

    describe('canAddDivider', () => {
        it('should return false if index is less than 1', () => {
            component.list = [new MockLink(), new MockLink()];
            expect(component.canAddDivider(0)).toBeFalse();
        });

        it('should return true if current and previous items are valid non-dividers', () => {
            component.list = [new MockLink(), new MockLink()];
            expect(component.canAddDivider(1)).toBeTrue();
        });

        it('should return false if current or previous items are not valid or are dividers', () => {
            component.list = [new MockLink(), new MockLink()];
            component.list[1].divider = true;
            expect(component.canAddDivider(1)).toBeFalse();
        });
    });

    describe('addDivider', () => {
        it('should add a divider at the given index', () => {
            component.config = { type: 'links' } as ListInputConfig;
            component.list = [new MockLink(), new MockLink()];
            component.addDivider(1);

            expect(component.list.length).toBe(3);
            expect(component.list[1].divider).toBeTrue();
        });
    });

    describe('removeDivider', () => {
        it('should remove a divider at the given index', () => {
            component.config = { type: 'links' } as ListInputConfig;
            component.list = [new MockLink(), new MockLink()];
            component.list[1].divider = true;
            component.removeDivider(1);

            expect(component.list.length).toBe(1);
        });
    });
});
