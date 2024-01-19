import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInputComponent } from './list-input.component';
import { Link, Metadata, ViewModel } from '../classes';

describe('ListInputComponent', () => {
    let component: ListInputComponent;
    let fixture: ComponentFixture<ListInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListInputComponent);
        component = fixture.debugElement.componentInstance;
        let vm1 = new ViewModel("layer","33","enterprise-attack-13",null);
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

    it('should add and remove divider for layer', () => {
        let vm1 = new ViewModel("layer","33","enterprise-attack-13",null);
        let m1 = new Metadata();
        m1.name = "test1";
        m1.value = "t1";
        vm1.metadata.push(m1);
        let m2 = new Metadata();
        m2.name = "test2";
        m2.value = "t2";
        vm1.metadata.push(m2);
        component.config = {
            viewModel: vm1,
            list: vm1.metadata,
            level: 'layer',
            type: 'metadata',
            nameField: 'name',
            valueField: 'value',
        };
        component.ngOnInit();
        if (component.canAddDivider(1)) {
            component.addDivider(1);
        }
        component.addDivider(1);
        component.removeDivider(1);
        expect(component.list.length).toEqual(3);
    });

    it('should throw errors for metadata', () => {
        let m1 = new Metadata();
        let metatdata_error_file1 = {
            "name":3,
            "value":4
        }
        let metatdata_error_file2 = {
            "name":3
        }
        let metatdata_error_file3 = {
            "divider":"test1"
        }
        let metatdata_error_file4 = {
            "value":"test1"
        }
        let consoleSpy = spyOn(console, 'error');
        m1.deserialize(JSON.stringify(metatdata_error_file1));
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Metadata field \'name\' is not a string');
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Metadata field \'value\' is not a string');
        m1.deserialize(JSON.stringify(metatdata_error_file2));
        expect(consoleSpy).toHaveBeenCalledWith('Error: Metadata required field \'value\' not present');
        m1.deserialize(JSON.stringify(metatdata_error_file3));
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Metadata field \'divider\' is not a boolean');
        m1.deserialize(JSON.stringify(metatdata_error_file4));
        expect(consoleSpy).toHaveBeenCalledWith('Error: Metadata required field \'name\' or \'divider\' not present');
    })

    it('should throw errors for links', () => {
        let l1 = new Link();
        let link_error_file1 = {
            "url":3,
            "label":4
        }
        let link_error_file2 = {
            "url":3
        }
        let link_error_file3 = {
            "divider":"test1"
        }
        let link_error_file4 = {
            "value":"test1"
        }
        let consoleSpy = spyOn(console, 'error');
        l1.deserialize(JSON.stringify(link_error_file1));
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Link field \'url\' is not a string');
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Link field \'label\' is not a string');
        l1.deserialize(JSON.stringify(link_error_file2));
        expect(consoleSpy).toHaveBeenCalledWith('Error: Link required field \'label\' not present');
        l1.deserialize(JSON.stringify(link_error_file3));
        expect(consoleSpy).toHaveBeenCalledWith('TypeError: Link field \'divider\' is not a boolean');
        l1.deserialize(JSON.stringify(link_error_file4));
        expect(consoleSpy).toHaveBeenCalledWith('Error: Link required field \'url\' or \'divider\' not present');
    })

    it('should not add divider', () => {
        expect(component.canAddDivider(5)).toEqual(false);
        expect(component.canAddDivider(0)).toEqual(false);
    });

    it('should add and remove divider for technique', () => {
        let vm1 = new ViewModel("layer","33","enterprise-attack-13",null);
        let m1 = new Metadata();
        m1.name = "test1";
        m1.value = "t1";
        vm1.metadata.push(m1);
        let m2 = new Metadata();
        m2.name = "test2";
        m2.value = "t2";
        vm1.metadata.push(m2);
        component.config = {
            viewModel: vm1,
            list: vm1.metadata,
            level: 'technique',
            type: 'metadata',
            nameField: 'name',
            valueField: 'value',
        };
        component.ngOnInit();
        if (component.canAddDivider(1)) {
            component.addDivider(1);
        }
        component.addDivider(1);
        component.removeDivider(1);
        expect(component.list.length).toEqual(3);
    });

    it('should return false if links are not in config type', () => {
        expect(component.includeLinks).toEqual(false);
    });
});
