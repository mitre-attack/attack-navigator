import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TabsComponent } from './tabs.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownService } from 'ngx-markdown';
import { DataService } from '../services/data.service';
import { ViewModel } from '../classes';
import { HelpComponent } from '../help/help.component';
import { SvgExportComponent } from '../svg-export/svg-export.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangelogComponent } from '../changelog/changelog.component';
import { LayerInformationComponent } from '../layer-information/layer-information.component';

describe('TabsComponent', () => {
    let comp: TabsComponent;
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
                DataService,
                MarkdownService
            ],
        }).compileComponents();
    }));

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(TabsComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create component', () => {
        expect(comp).toBeTruthy();
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

    it('should open dialog', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        const openDialogSpy = spyOn(app.dialog, 'open');
        app.openDialog("layers");
        expect(openDialogSpy).toHaveBeenCalledWith(LayerInformationComponent, {
            maxWidth: '90ch',
        });
        app.openDialog("help");
        const settings = { maxWidth: '75ch', panelClass: app.userTheme};
        expect(openDialogSpy).toHaveBeenCalledWith(HelpComponent, settings);
        app.openDialog("changelog");
        expect(openDialogSpy).toHaveBeenCalledWith(ChangelogComponent, settings);
    });

    it('should open svg dialog', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        const openDialogSpy = spyOn(app.dialog, 'open');
        let vm: ViewModel;
        app.openSVGDialog(vm);
        const settings = {
            data: { vm: vm },
            panelClass: ['dialog-custom', app.userTheme],
        };
        expect(openDialogSpy).toHaveBeenCalledWith(SvgExportComponent, settings);
    });

    it('should adjust the height', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.adjustHeader(5);
        expect(app.adjustedHeaderHeight).toEqual(5);
    });

    it('should handle tab click', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.newBlankTab();
        app.handleTabClick(app.layerTabs[0]);
        app.newBlankTab();
        app.handleTabClick(app.layerTabs[0]);
        expect(app.activeTab).toEqual(app.layerTabs[0]);
    });

    // it('should create new layer by operation based on user input', () => {
    //     let fixture = TestBed.createComponent(TabsComponent);
    //     let app = fixture.debugElement.componentInstance;
    //     app.opSettings.scoreExpression = "a+b";
    //     app.getScoreExpressionError();
    //     let scoreVariables = new Map<string, ViewModel>();
    //     let vm1 = app.viewModelsService.newViewModel("layer","enterprise-attack-13");
	// 	let vm2 = app.viewModelsService.newViewModel("layer1","enterprise-attack-13");
    //     scoreVariables.set("a",vm1);
	// 	scoreVariables.set("b",vm2);
    //     app.openTab('layer', vm1, true, true, true, true);
    //     app.openTab('layer1', vm2, true, true, true, true);
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
    //     app.dataService.setUpURLs(versions);
    //     app.opSettings.domain = "enterprise-attack-13";
    //     app.layerByOperation();
    //     expect(app.layerTabs.length).toEqual(3);

    //     // let subscription = app.layerByOperation().subscribe({
    //     //     next: () => {
    //     //         expect(app.layerTabs.length).toEqual(3);
    //     //     },
    //     //     complete: () => {
    //     //         if (subscription) subscription.unsubscribe();
    //     //     }
    //     // })

    //     // fixture.whenStable().then(() => {
    //     //     fixture.detectChanges(); 
    //         // expect(app.layerTabs.length).toEqual(3);
    //     //});
    // });

    it('should create new layer by operation based on user input', async () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.opSettings.scoreExpression = "a+b";
        app.getScoreExpressionError();
        let scoreVariables = new Map<string, ViewModel>();
        let vm1 = app.viewModelsService.newViewModel("layer","enterprise-attack-13");
		let vm2 = app.viewModelsService.newViewModel("layer1","enterprise-attack-13");
        scoreVariables.set("a",vm1);
		scoreVariables.set("b",vm2);
        app.openTab('layer', vm1, true, true, true, true);
        app.openTab('layer1', vm2, true, true, true, true);
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
        app.dataService.setUpURLs(versions); // set up data
        app.opSettings.domain = "enterprise-attack-13";
        spyOn(app.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        await app.layerByOperation();
        expect(app.layerTabs.length).toEqual(3);       
    });

    // it('does a thing', async function() {
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
    //     app.dataService.setUpURLs(versions);
    //     let default_layers = {
    //         "enabled": true,
    //         "urls": ["layer-2.json"]
    //     }
    //     const result = await app.loadTabs(default_layers);
    //     expect(app.activeTab.title).toEqual('layer');
    //   });

    // it('should load tabs', async () => {
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
    //     app.dataService.setUpURLs(versions);
    //     let default_layers = {
    //         "enabled": true,
    //         "urls": ["https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json"]
    //     }
    //     await app.loadTabs(default_layers);
    //     expect(app.activeTab.title).toEqual('layer');
    // });
});
