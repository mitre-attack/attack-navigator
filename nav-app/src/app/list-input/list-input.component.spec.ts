import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListInputComponent } from './list-input.component';
import { Metadata, ViewModel } from '../classes';

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
