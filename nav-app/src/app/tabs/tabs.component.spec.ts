import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TabsComponent } from './tabs.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tab, Version, ViewModel } from '../classes';
import { Dialog } from '@angular/cdk/dialog';

describe('TabsComponent', () => {
    let component: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule],
            declarations: [TabsComponent],
            providers: [
                {
                    provide: MatSnackBar,
                    useValue: {},
                }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should create new tab', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.newBlankTab()
        expect(app.layerTabs.length).toEqual(1);
    });

    it('should close all open tabs and create new one', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let viewModel: ViewModel;
        let app = fixture.debugElement.componentInstance;
        app.openTab('new layer', viewModel, true, true, true, true)
        app.closeTab(app.layerTabs[0])
        expect(app.layerTabs.length).toEqual(1);
    });

    it('should close one tab', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let viewModel: ViewModel;
        let app = fixture.debugElement.componentInstance;
        app.openTab('new layer1', viewModel, true, true, true, true)
        app.openTab('new layer', viewModel, true, true, true, true)
        app.closeTab(app.layerTabs[0])
        expect(app.layerTabs.length).toEqual(1);
    });

    it('should set the active tab to the latest created tab', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let viewModel: ViewModel;
        let app = fixture.debugElement.componentInstance;
        app.openTab('new layer', viewModel, true, true, true, true)
        app.openTab('new layer1', viewModel, true, true, true, true)
        app.openTab('new layer2', viewModel, true, true, true, true)
        expect(app.activeTab.title).toEqual("new layer2");
    });

    it('should close the latest created tab', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let viewModel: ViewModel;
        let app = fixture.debugElement.componentInstance;
        app.openTab('new layer', viewModel, true, true, true, true)
        app.openTab('new layer1', viewModel, true, true, true, true)
        app.openTab('new layer2', viewModel, true, true, true, true)
        app.closeTab(app.layerTabs[0]) //closes new layer 2
        expect(app.activeTab.title).toEqual("new layer1");
    });
});
