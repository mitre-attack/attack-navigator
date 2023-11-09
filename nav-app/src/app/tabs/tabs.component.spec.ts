import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
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
import * as is from 'is_js';

describe('TabsComponent', () => {
    let comp: TabsComponent;
    let fixture: ComponentFixture<TabsComponent>;

    let bundles: any[] = [{
        "type": "bundle",
        "id": "bundle--0",
        "spec_version": "2.0",
        "objects": [
        ]
    }];

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
        let vm1 = app.viewModelsService.newViewModel("layer","enterprise-attack-13");
        vm1.sidebarContentType = "search";
        app.openTab('new layer 1', vm1, true, true, true, true);
        app.openTab('new tab', viewModel, true, true, true, true);
        app.openTab('new tab', viewModel, true, true, true, true);
        app.openTab('new layer 1', viewModel, true, true, false, true);
        app.closeTab(app.layerTabs[0]);
        app.closeTab(app.layerTabs[0]);
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
        app.openTab('new layer', viewModel, true, true, true, true);
        app.openTab('new layer1', viewModel, true, true, true, true);
        app.selectTab(app.layerTabs[1]);
        app.closeTab(app.layerTabs[1]);
        app.openTab('new layer2', viewModel, true, true, true, true);
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
        expect(app.isAlphabetical('newlayer')).toEqual(true);
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
                    }
                ]
            }]
        app.dataService.setUpURLs(versions);
        expect(app.latestDomains.length).toEqual(1);
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
        spyOn(is,'safari').and.returnValue(true);
        app.ngAfterViewInit();
        expect(openDialogSpy).toHaveBeenCalledWith(app.safariWarning, {
            width: '350px',
            disableClose: true,
            panelClass: app.userTheme,
        });
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

    it('should handle links', () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.customizedConfig = [
            {"name": "technique_controls", "enabled": true, "description": "Disable to disable all subfeatures", "subfeatures": [
                {"name": "disable_techniques", "enabled": false, "description": "Disable to remove the ability to disable techniques."},
            ]},
            {"name": "sticky_toolbar", "enabled": false}
        ]
        expect(app.trackByFunction(1)).toEqual(1);
        app.addLayerLink();
        expect(app.layerLinkURLs.length).toEqual(1);
        app.addLayerLink();
        app.removeLayerLink(1);
        expect(app.layerLinkURLs.length).toEqual(1);
        app.getLayerLink();
        app.removeLayerLink(0);
        let url_string = app.getLayerLink();
        expect(url_string).toContain("disable_techniques=false&sticky_toolbar=false");
    });

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
                    }
                ]
            }]
        app.dataService.setUpURLs(versions); // set up data
        app.opSettings.domain = "enterprise-attack-13";
        expect(app.getFilteredVMs()).toEqual(app.viewModelsService.viewModels);
        spyOn(app.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        await app.layerByOperation();
        expect(app.layerTabs.length).toEqual(3);       
    });

    it('should create new layer by operation based on user input else', async () => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        app.opSettings.scoreExpression = "a+2";
        app.getScoreExpressionError();
        let scoreVariables = new Map<string, ViewModel>();
        let vm1 = app.viewModelsService.newViewModel("layer","enterprise-attack-13");
        scoreVariables.set("a",vm1);
        app.openTab('layer', vm1, true, true, true, true);
        let versions = [
            {
                "name": "ATT&CK v13",
                "version": "13",
                "domains": [
                    {
                        "name": "Enterprise",
                        "identifier": "enterprise-attack",
                        "data": ["https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/enterprise-attack/enterprise-attack.json"]
                    }
                ]
            }]
            app.dataService.setUpURLs(versions); // set up data
            app.dataService.parseBundle(app.dataService.getDomain("enterprise-attack-13"), bundles);
            app.opSettings.domain = "enterprise-attack-13";
            spyOn(app.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            await app.layerByOperation();
            expect(app.layerTabs.length).toEqual(2);      
    });

    it('should emit on theme change', (() => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        spyOn(app.onUserThemeChange, 'emit');
        app.handleUserThemeChange("dark");
        expect(app.onUserThemeChange.emit).toHaveBeenCalled();
    }));

    it('should copy link', (fakeAsync (() => {
        let fixture = TestBed.createComponent(TabsComponent);
        let app = fixture.debugElement.componentInstance;
        var mockedDocElement = document.createElement('input');
        mockedDocElement.id = 'layerLink';
        mockedDocElement.value = 'test1';
        mockedDocElement.type = "text";
        document.getElementById = jasmine.createSpy('layerLink').and.returnValue(mockedDocElement)
        const logSpy = spyOn(console, 'debug');
        app.copyLayerLink();
        flush();
        expect(logSpy).toHaveBeenCalledWith('copied', mockedDocElement.value);
    })));
});
