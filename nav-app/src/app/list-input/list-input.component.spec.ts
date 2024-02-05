import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInputComponent } from './list-input.component';
import { Link, Metadata, ViewModel } from '../classes';
import * as MockData from '../../tests/utils/mock-data';

describe('ListInputComponent', () => {
    let component: ListInputComponent;
    let fixture: ComponentFixture<ListInputComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(ListInputComponent);
        component = fixture.debugElement.componentInstance;
        let vm1 = new ViewModel('layer', '33', 'enterprise-attack-13', null);
        component.config = {
            viewModel: vm1,
            list: vm1.metadata,
            level: 'layer',
            type: 'metadata',
            nameField: 'name',
            valueField: 'value',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should and remove from list', () => {
        component.addDivider(0);
        component.add();
        component.add();
        component.remove(1);
        component.addDivider(0);
        component.addDivider(2);
        component.add();
        component.remove(1);
        component.addDivider(1);
        component.addDivider(1);
        component.remove(component.list.length - 1);
        expect(component.list.length).toEqual(1);
    });

    it('should throw errors for metadata', () => {
        let consoleSpy = spyOn(console, 'error');
        let metadata = new Metadata();
        metadata.deserialize(JSON.stringify(MockData.invalidMetadata));
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Metadata field 'name' is not a string");
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Metadata field 'value' is not a string");
        metadata.deserialize(JSON.stringify(MockData.invalidName));
        expect(consoleSpy).toHaveBeenCalledWith("Error: Metadata required field 'value' not present");
        metadata.deserialize(JSON.stringify(MockData.invalidDivider));
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Metadata field 'divider' is not a boolean");
        metadata.deserialize(JSON.stringify(MockData.invalidValue));
        expect(consoleSpy).toHaveBeenCalledWith("Error: Metadata required field 'name' or 'divider' not present");
    });

    it('should throw errors for links', () => {
        let consoleSpy = spyOn(console, 'error');
        let link = new Link();
        link.deserialize(JSON.stringify(MockData.invalidLink));
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Link field 'url' is not a string");
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Link field 'label' is not a string");
        link.deserialize(JSON.stringify(MockData.invalidUrl));
        expect(consoleSpy).toHaveBeenCalledWith("Error: Link required field 'label' not present");
        link.deserialize(JSON.stringify(MockData.invalidDivider));
        expect(consoleSpy).toHaveBeenCalledWith("TypeError: Link field 'divider' is not a boolean");
        link.deserialize(JSON.stringify(MockData.invalidValue));
        expect(consoleSpy).toHaveBeenCalledWith("Error: Link required field 'url' or 'divider' not present");
    });

    it('should return false if links are not in config type', () => {
        expect(component.includeLinks).toEqual(false);
    });
});

describe('Dividers', () => {
    let component: ListInputComponent;
    let fixture: ComponentFixture<ListInputComponent>;
    let viewModel: ViewModel;

    let addDivider = (component) => {
        if (component.canAddDivider(1)) {
            component.addDivider(1);
        }
        component.addDivider(1);
        component.removeDivider(1);
    };

    beforeEach(() => {
        fixture = TestBed.createComponent(ListInputComponent);
        component = fixture.debugElement.componentInstance;
        viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);
        let metadata = new Metadata();
        metadata.name = 'test1';
        metadata.value = 't1';
        let metadata2 = new Metadata();
        metadata2.name = 'test2';
        metadata2.value = 't2';
        viewModel.metadata = [metadata, metadata2];
        component.config = {
            viewModel: viewModel,
            list: viewModel.metadata,
            level: 'layer',
            type: 'metadata',
            nameField: 'name',
            valueField: 'value',
        };
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should add and remove divider for layer', () => {
        component.config.level = 'layer';
        addDivider(component);
        expect(component.list.length).toEqual(3);
    });

    it('should add and remove divider for technique', () => {
        component.config.level = 'technique';
        component.ngOnInit();
        addDivider(component);
        expect(component.list.length).toEqual(3);
    });

    it('should not add divider', () => {
        expect(component.canAddDivider(5)).toEqual(false);
        expect(component.canAddDivider(0)).toEqual(false);
    });
});
