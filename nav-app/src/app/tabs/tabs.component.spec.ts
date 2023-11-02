import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TabsComponent } from './tabs.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tab, Version, ViewModel } from '../classes';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../services/data.service';

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
                },
                {
                    provide: MatDialogRef,
                    useValue: {},
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                DataService
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
        app.newBlankTab();
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

    it('should create new layer', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        let versions = [
            {
                "name": "ATT&CK v13",
                "version": "13",
                "domains": [
                    {
                        "name": "Enterprise",
                        "identifier": "enterprise-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
                    },
                    {
                        "name": "Mobile",
                        "identifier": "mobile-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/mobile-attack/mobile-attack.json"]
                    },
                    {
                        "name": "ICS",
                        "identifier": "ics-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/ics-attack/ics-attack.json"]
                    }
                ]
            }]
        app.dataService.setUpURLs(versions);
        app.newLayer("enterprise-attack-13");
        expect(app.layerTabs.length).toEqual(1);
    });

    // it('should load tabs', waitForAsync(() => {
    //     let fixture = TestBed.createComponent(TabsComponent);
    //     let app = fixture.debugElement.componentInstance;
    //     let versions = [
    //         {
    //             "name": "ATT&CK v13",
    //             "version": "13",
    //             "domains": [
    //                 {
    //                     "name": "Enterprise",
    //                     "identifier": "enterprise-attack",
    //                     "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
    //                 },
    //                 {
    //                     "name": "Mobile",
    //                     "identifier": "mobile-attack",
    //                     "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/mobile-attack/mobile-attack.json"]
    //                 },
    //                 {
    //                     "name": "ICS",
    //                     "identifier": "ics-attack",
    //                     "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/ics-attack/ics-attack.json"]
    //                 }
    //             ]
    //         }]
    //     let default_layers =  {
    //             "enabled": true,
    //             "urls": ["https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json"]
    //     }
    //     //app.dataService.setUpURLs(versions);
    //     let viewModel: ViewModel;
    //     //app.openTab('new layer1', viewModel, true, true, true, true)
    //     app.loadTabs(default_layers);
    //     expect(app.layerTabs.length).toEqual(1);
    // }));

    it('should check if feature is defined in config file', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        let feature_object = {"name": "technique_controls", "enabled": true, "description": "Disable to disable all subfeatures", "subfeatures": [
            {"name": "disable_techniques", "enabled": true, "description": "Disable to remove the ability to disable techniques."},
            {"name": "manual_color", "enabled": true, "description": "Disable to remove the ability to assign manual colors to techniques."},
            {"name": "background_color", "enabled": true, "description": "Disable to remove the background color effect on manually assigned colors."}
            ]}
        app.configService.setFeature_object(feature_object)
        expect(app.hasFeature("manual_color")).toBeTrue();
    });
});
