import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from "@angular/core/testing";
import { TabsComponent } from "./tabs.component";
import { ViewModelsService } from "../services/viewmodels.service";
import { DataService } from "../services/data.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule } from "@angular/forms";
import { Domain, Tab, TechniqueVM, Version, ViewModel } from "../classes";
import { MatTabsModule } from "@angular/material/tabs";
import { ConfigService } from "../services/config.service";
import * as MockData from '../../tests/utils/mock-data';
import * as MockLayers from '../../tests/utils/mock-layers';
import { of } from "rxjs";
import { ChangelogComponent } from "../changelog/changelog.component";
import { HelpComponent } from "../help/help.component";
import { LayerInformationComponent } from "../layer-information/layer-information.component";
import { SvgExportComponent } from "../svg-export/svg-export.component";
import { Technique } from "../classes/stix";

describe('TabsComponent', () => {
	let component: TabsComponent;
	let fixture: ComponentFixture<TabsComponent>;
	let dataService: DataService;
	let configService: ConfigService;
	let dialog: MatDialog;
	let http: HttpClient;

    let testTab = new Tab('test tab', true, false, 'enterprise-attack', true);
    let loadData = {
        url: 'https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/samples/Bear_APT.json',
        version: '14',
        identifier: 'enterprise-attack',
    };

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TabsComponent],
			imports: [
				HttpClientModule,
				MatDialogModule,
				MatSnackBarModule,
				MatTabsModule,
				FormsModule,
			],
			providers: [
				ViewModelsService,
				DataService,
				ConfigService,
				{provide: MatSnackBar, useValue: {}}
			]
		}).compileComponents();

		configService = TestBed.inject(ConfigService);
		configService.defaultLayers = MockData.defaultLayersDisabled;
		fixture = TestBed.createComponent(TabsComponent);
		component = fixture.componentInstance;
		dataService = TestBed.inject(DataService);
		dialog = TestBed.inject(MatDialog);
		http = TestBed.inject(HttpClient);

        dataService.latestVersion = {
            name: "ATT&CK v18",
            number: "18",
        } as Version;
	});

    describe('constructor', () => {
        beforeEach(() => {
            configService.defaultLayers = MockData.defaultLayersEnabled;
        });

        it('should create TabsComponent', () => {
            fixture = TestBed.createComponent(TabsComponent);
            component = fixture.debugElement.componentInstance;
            expect(component).toBeTruthy();
        });

        it('should call newBlankTab on initialization', () => {
            let blankTabSpy = spyOn(TabsComponent.prototype, 'newBlankTab');
            fixture = TestBed.createComponent(TabsComponent);
            component = fixture.debugElement.componentInstance;
            expect(blankTabSpy).toHaveBeenCalled();
        });

        it('should call loadTabs with default layers and handle success', () => {
            let loadTabsSuccess = spyOn(TabsComponent.prototype, 'loadTabs').and.returnValue(Promise.resolve());
            fixture = TestBed.createComponent(TabsComponent);
            component = fixture.debugElement.componentInstance;
            expect(loadTabsSuccess).toHaveBeenCalledWith(MockData.defaultLayersEnabled);
        });

        it('should set bannerContent from ConfigService', () => {
            fixture = TestBed.createComponent(TabsComponent);
            component = fixture.debugElement.componentInstance;
            expect(component.bannerContent).toEqual(configService.banner);
        });
    });

    describe('loadTabs', () => {
        it('should load bundle when all fragment values are provided', waitForAsync(() => {
            let bundleURL = 'testbundleurl';
            let bundleVersion = '1';
            let bundleDomain = 'enterprise-attack';
            spyOn(component, 'getNamedFragmentValue').and.returnValues([bundleURL], [bundleVersion], [bundleDomain]);
            let newLayerSpy = spyOn(component, 'newLayerFromURL');
            component.loadTabs(MockData.defaultLayersDisabled).then(() => {
                expect(newLayerSpy).toHaveBeenCalledWith({ url: bundleURL, version: bundleVersion, identifier: bundleDomain });
            });
        }));

        it('should load layers from URL when provided', waitForAsync(() => {
            let layerURLs = ['testlayerurl1', 'testlayerurl2'];
            spyOn(component, 'getNamedFragmentValue')
                .and.returnValue([]) // return empty list for bundle fragments
                .withArgs('layerURL')
                .and.returnValue(layerURLs);
            let loadLayerSpy = spyOn(component, 'loadLayerFromURL');
            component.loadTabs(MockData.defaultLayersDisabled).then(() => {
                expect(loadLayerSpy).toHaveBeenCalledTimes(layerURLs.length);
            });
        }));

        it('should not load default layers when disabled', waitForAsync(() => {
            spyOn(component, 'getNamedFragmentValue').and.returnValue([]); // return empty list for all fragments
            let loadLayerSpy = spyOn(component, 'loadLayerFromURL');
            component.loadTabs(MockData.defaultLayersDisabled).then(() => {
                expect(loadLayerSpy).not.toHaveBeenCalled();
            });
        }));

        it('should load default layers when enabled', waitForAsync(() => {
            spyOn(component, 'getNamedFragmentValue').and.returnValue([]); // return empty list for all fragments
            let loadLayerSpy = spyOn(component, 'loadLayerFromURL');
            component.loadTabs(MockData.defaultLayersEnabled).then(() => {
                expect(loadLayerSpy).toHaveBeenCalledTimes(MockData.defaultLayersEnabled.urls.length);
            });
        }));
    });

    describe('openTab', () => {
        let existingTab = new Tab('existing test tab', true, false, 'enterprise-attack', true);
        let selectTabSpy;
        let closeActiveTabSpy;

        beforeEach(() => {
            component.layerTabs = []; // reset tabs
            component.activeTab = undefined;

            selectTabSpy = spyOn(component, 'selectTab');
            closeActiveTabSpy = spyOn(component, 'closeActiveTab');
        });

        it('should change to existing tab', () => {
            component.layerTabs = [existingTab];
            component.openTab(existingTab.title, null, existingTab.isCloseable, true, false);
            expect(selectTabSpy).toHaveBeenCalledWith(existingTab);
        });

        it('should create and select new tab', () => {
            component.openTab('new test tab', null, false, false, true);
            expect(component.layerTabs.length).toEqual(1);
            expect(component.layerTabs[0].title).toEqual('new test tab');
            expect(selectTabSpy).toHaveBeenCalledWith(component.layerTabs[0]);
            expect(closeActiveTabSpy).not.toHaveBeenCalled();
        });

        it('should replace the active tab', () => {
            component.layerTabs = [existingTab];
            component.activeTab = existingTab;
            component.openTab('new test tab', null, false, true, true);
            console.log('mytest', component.layerTabs);
            expect(component.layerTabs.length).toEqual(2);
            expect(component.layerTabs[0].title).toEqual('new test tab');
            expect(selectTabSpy).toHaveBeenCalledWith(component.layerTabs[0]);
            expect(closeActiveTabSpy).not.toHaveBeenCalled();
        });

        it('should close current tab and select new tab', () => {
            let newTab = new Tab('new tab', true, false, 'enterprise-attack', true);
            component.layerTabs = [existingTab, newTab];
            component.activeTab = newTab;
            component.openTab('new test tab', null, false, true, true);
            expect(component.layerTabs.length).toEqual(3);
            expect(component.layerTabs[1].title).toEqual('new test tab');
            expect(selectTabSpy).toHaveBeenCalledWith(component.layerTabs[1]);
            expect(closeActiveTabSpy).toHaveBeenCalled();
        });

        it('should reset dropdown when selecting new tab', () => {
            component.dropdownEnabled = 'comment';
            component.openTab('new test tab', null, false, false, true);
            expect(component.dropdownEnabled).toEqual('');
        });

        it('should not reset dropdown when replacing active tab', () => {
            component.dropdownEnabled = 'comment';
            component.layerTabs = [existingTab];
            component.activeTab = existingTab;
            component.openTab('new test tab', null, false, true, true);
            expect(component.dropdownEnabled).toEqual('comment');
        });
    });

    describe('close tab', () => {
        let firstTab = new Tab('first tab', true, false, 'enterprise-attack', true);
        let secondTab = new Tab('second tab', true, false, 'enterprise-attack', true);
        let selectTabSpy;
        let newBlankTabSpy;

        beforeEach(() => {
            component.layerTabs = []; // reset tabs
            component.activeTab = undefined;

            selectTabSpy = spyOn(component, 'selectTab');
            newBlankTabSpy = spyOn(component, 'newBlankTab');
        });

        it('should close the first tab and select the second tab', () => {
            component.layerTabs = [firstTab, secondTab];
            component.activeTab = firstTab;
            component.closeTab(firstTab);

            expect(component.layerTabs.length).toEqual(1);
            expect(component.layerTabs[0]).toBe(secondTab);
            expect(selectTabSpy).toHaveBeenCalledWith(secondTab);
            expect(newBlankTabSpy).not.toHaveBeenCalled();
        });

        it('should close the second tab and select the first', () => {
            component.layerTabs = [firstTab, secondTab];
            component.activeTab = secondTab;
            component.closeTab(secondTab);

            expect(component.layerTabs.length).toEqual(1);
            expect(component.layerTabs[0]).toBe(firstTab);
            expect(selectTabSpy).toHaveBeenCalledWith(firstTab);
            expect(newBlankTabSpy).not.toHaveBeenCalled();
        });

        it('should close the only tab and create a new blank tab', () => {
            component.layerTabs = [firstTab];
            component.activeTab = firstTab;
            component.closeTab(firstTab);

            expect(component.layerTabs.length).toEqual(0);
            expect(selectTabSpy).not.toHaveBeenCalled();
            expect(newBlankTabSpy).toHaveBeenCalled();
        });

        it('should close non-active tab', () => {
            component.layerTabs = [firstTab, secondTab];
            component.activeTab = firstTab;
            component.closeTab(secondTab);

            expect(component.layerTabs.length).toEqual(1);
            expect(component.layerTabs[0]).toBe(firstTab);
            expect(selectTabSpy).not.toHaveBeenCalled();
            expect(newBlankTabSpy).not.toHaveBeenCalled();
        });

        it('should close the only tab and not create a new one when allowNoTab is true', () => {
            component.layerTabs = [firstTab];
            component.activeTab = firstTab;
            component.closeTab(firstTab, true);

            expect(component.layerTabs.length).toEqual(0);
            expect(selectTabSpy).not.toHaveBeenCalled();
            expect(newBlankTabSpy).not.toHaveBeenCalled();
        });

        it('should close the active tab', () => {
            component.activeTab = testTab;
            spyOn(component, 'closeTab');
            component.closeActiveTab();
            expect(component.closeTab).toHaveBeenCalledWith(testTab, false);
        });
    });

    describe('getUniqueLayerName', () => {
        let viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);
        let viewModel1 = new ViewModel('layer1', '1', 'enterprise-attack-13', null);
        const root = 'layer';

        it('should return root layer name when no existing layers match root', () => {
            component.viewModelsService.viewModels = [];
            let rootLayerName = component.getUniqueLayerName(root);
            expect(rootLayerName).toEqual(root);
        });

        it('should generate unique layer name when existing layer matches root exactly', () => {
            component.viewModelsService.viewModels = [viewModel];
            let nextRootName = component.getUniqueLayerName(root);
            expect(nextRootName).toEqual('layer1');
        });

        it('should generate unique layer name when multiple existing layers match root', () => {
            component.viewModelsService.viewModels = [viewModel, viewModel1];
            let nextRootName = component.getUniqueLayerName(root);
            expect(nextRootName).toEqual('layer2');
        });
    });

    describe('validateInput', () => {
        it('should validate input and throw errors', waitForAsync(() => {
            let layer = JSON.parse(JSON.stringify(MockLayers.invalidLayerFile1));
            let alertSpy = spyOn(window, 'alert');
            let consoleSpy = spyOn(console, 'error');
            component.validateInput(layer, 'enterprise-attack-13');
            expect(consoleSpy).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalled();
        }));

        it('should validate if the domainVersionID is unique', waitForAsync(() => {
			let layer = JSON.parse(JSON.stringify(MockLayers.invalidLayerFile1));
            let alertSpy = spyOn(window, 'alert');
            let consoleSpy = spyOn(console, 'error');
            component.validateInput(layer, 'enterprise-attack-13');
            expect(consoleSpy).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalled();
        }));
    });

    describe('tab utility functions', () => {
        it('should handle links', () => {
            configService.featureList = [
                {
                    name: 'technique_controls',
                    enabled: true,
                    description: 'Disable to disable all subfeatures',
                    subfeatures: [
                        { name: 'disable_techniques', enabled: false, description: 'Disable to remove the ability to disable techniques.' },
                    ],
                },
                { name: 'sticky_toolbar', enabled: false },
            ];
            expect(component.getNamedFragmentValue('sticky_toolbar')).toEqual([]);
            expect(
                component.getNamedFragmentValue('sticky_toolbar', 'https://mitre-attack.github.io/attack-navigator/#sticky_toolbar=false')
            ).toEqual(['false']);
            expect(component.trackByFunction(1)).toEqual(1);
            component.addLayerLink();
            expect(component.layerLinkURLs.length).toEqual(1);
            component.addLayerLink();
            component.removeLayerLink(1);
            expect(component.layerLinkURLs.length).toEqual(1);
            component.getLayerLink();
            component.removeLayerLink(0);
            let url_string = "https://mitre-attack.github.io/attack-navigator/#disable_techniques=false&sticky_toolbar=false"
            expect(url_string).toContain('disable_techniques=false&sticky_toolbar=false');
        });

        it('should copy link', fakeAsync(() => {
            let mockedDocElement = document.createElement('input');
            mockedDocElement.id = 'layerLink';
            mockedDocElement.value = 'test1';
            mockedDocElement.type = 'text';
            document.getElementById = jasmine.createSpy('layerLink').and.returnValue(mockedDocElement);
            const logSpy = spyOn(console, 'debug');
            component.copyLayerLink();
            flush();
            expect(logSpy).toHaveBeenCalledWith('copied', mockedDocElement.value);
        }));

        it('should open upload prompt', fakeAsync(() => {
            let mockedDocElement = document.createElement('input');
            mockedDocElement.id = 'uploader';
            mockedDocElement.value = 'test1';
            mockedDocElement.type = 'text';
            document.getElementById = jasmine.createSpy('uploader').and.returnValue(mockedDocElement);
            const logSpy = spyOn(mockedDocElement, 'click');
            component.openUploadPrompt();
            flush();
            expect(logSpy).toHaveBeenCalled();
        }));

        it('should adjust the header height', () => {
            let newHeight = 5;
            component.adjustHeader(newHeight);
            expect(component.adjustedHeaderHeight).toEqual(newHeight);
        });

        it('should call openTab when opening a new blank tab', () => {
            spyOn(component, 'openTab');
            component.newBlankTab();
            expect(component.openTab).toHaveBeenCalled();
        });

        it('should select the specified tab', () => {
            component.selectTab(testTab);
            expect(component.activeTab).toBe(testTab);
        });

        it('should activate clicked tab and reset dropdown', () => {
            let activeTab = new Tab('active tab', true, false, 'enterprise-attack', true);
            let clickedTab = new Tab('clicked tab', true, false, 'enterprise-attack', true);
            component.activeTab = activeTab;

            component.handleTabClick(clickedTab);

            expect(component.activeTab).toBe(clickedTab);
            expect(component.dropdownEnabled).toEqual('');
        });

        it('should toggle dropdown state if clicked tab is active', () => {
            let activeTab = new Tab('active tab', true, false, 'enterprise-attack', true);
            component.activeTab = activeTab;
            component.dropdownEnabled = '';

            component.handleTabClick(activeTab);

            expect(component.activeTab).toEqual(activeTab);
            expect(component.dropdownEnabled).toEqual('description');

            component.handleTabClick(activeTab);

            expect(component.activeTab).toEqual(activeTab);
            expect(component.dropdownEnabled).toEqual('');
        });

        it('should filter domains based on version', () => {
            let v13 = new Version('ATT&CK v13', '13');
            let v12 = new Version('ATT&CK v12', '12');
            let domainv13 = new Domain('enterprise-attack-13', 'Enterprise ATT&CK', v13);
            let domainv12 = new Domain('enterprise-attack-12', 'Enterprise ATT&CK', v12);
            dataService.domains = [domainv13, domainv12];
            let filteredDomains = component.filterDomains(v12);
            expect(filteredDomains).toEqual([domainv12]);
        });

        it('should return empty array if no domains match the version', () => {
            let v13 = new Version('ATT&CK v13', '13');
            let v12 = new Version('ATT&CK v12', '12');
            let domainv13 = new Domain('enterprise-attack-13', 'Enterprise ATT&CK', v13);
            dataService.domains = [domainv13];
            let filteredDomains = component.filterDomains(v12);
            expect(filteredDomains).toEqual([]);
        });

        it('should check if feature is defined in config file', () => {
            component.configService.setFeature_object(MockData.configTechniqueControls);
            expect(component.hasFeature('manual_color')).toBeTrue();
        });

        it('should emit event on theme change', () => {
            spyOn(component.onUserThemeChange, 'emit');
            component.handleUserThemeChange('dark');
            expect(component.onUserThemeChange.emit).toHaveBeenCalled();
        });

        it('should open the selected dialog', () => {
            const settings = { maxWidth: '75ch', panelClass: component.userTheme, autoFocus: false, data: {theme: undefined} };
            const openDialogSpy = spyOn(component.dialog, 'open');

            // layer dialog
            component.openDialog('layers');
            expect(openDialogSpy).toHaveBeenCalledWith(LayerInformationComponent, settings);

            // help dialog
            component.openDialog('help');
            expect(openDialogSpy).toHaveBeenCalledWith(HelpComponent, settings);

            // changelog dialog
            component.openDialog('changelog');
            expect(openDialogSpy).toHaveBeenCalledWith(ChangelogComponent, settings);
        });

        it('should open the SVG exporter dialog', () => {
            const openDialogSpy = spyOn(component.dialog, 'open');
            let viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);

            component.openSVGDialog(viewModel);
            const settings = {
                data: { vm: viewModel },
                panelClass: ['dialog-custom', component.userTheme],
                autoFocus: false,
            };
            expect(openDialogSpy).toHaveBeenCalledWith(SvgExportComponent, settings);
        });

        it('should create new layer from url', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configData.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.http = http;
            spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.newLayerFromURL(loadData, JSON.parse(JSON.stringify(MockLayers.layerFile1)));
            expect(component.dataService.domains.length).toEqual(2);
        }));

        it('should read and open json file', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configData.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let mockedDocElement = document.createElement('input');
            mockedDocElement.id = 'uploader';
            mockedDocElement.value = 'test1';
            mockedDocElement.type = 'text';
            document.getElementById = jasmine.createSpy('uploader').and.returnValue(mockedDocElement);
            const logSpy = spyOn(mockedDocElement, 'click');
            component.openUploadPrompt();
            expect(logSpy).toHaveBeenCalled();
            let blob = new Blob([JSON.stringify(MockLayers.layerFile2)], { type: 'text/json' });
            let file = new File([blob], 'layer-1.json');
            component.readJSONFile(file).then(() => {
                expect(component.layerTabs.length).toEqual(1);
            });
        }));

        it('should retrieve the minimum supported version', () => {
            const result = component.minimumSupportedVersion;
            expect(result).toBeDefined();
            expect(result).toBe('4.0');
        });

        it('should retrieve the current navigator version', () => {
            const result = component.navVersion;
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });
    });

    describe('layerByOperation', () => {
        it('should create new layer by operation based on user input', () => {
            component.opSettings.scoreExpression = 'a+b';
            component.opSettings.domain = 'enterprise-atack-13';
            let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
            let vm2 = component.viewModelsService.newViewModel('layer1', 'enterprise-attack-13');
            component.openTab('layer', vm1, true, true, true, true);
            component.openTab('layer1', vm2, true, true, true, true);
            expect(component.getScoreExpressionError()).toEqual('Layer b does not match the chosen domain');
            component.dataService.setUpDomains(MockData.configData.entries); // set up data
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.opSettings.domain = 'enterprise-attack-13';
            expect(component.getFilteredVMs()).toEqual(component.viewModelsService.viewModels);
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.dataService.getDomain(component.opSettings.domain).dataLoaded = false;
            component.layerByOperation();
            expect(component.layerTabs.length).toEqual(2);
        });

        it('should create new layer by operation based on user input when data is loaded', () => {
            component.opSettings.scoreExpression = 'a+2';
            let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
            component.openTab('layer', vm1, true, true, true, true);
            expect(component.getScoreExpressionError()).toEqual(null);
            component.dataService.setUpDomains(MockData.configData.entries); // set up data
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.dataService.parseBundles(component.dataService.getDomain('enterprise-attack-13'), MockData.stixBundleSDO); //load the data
            component.opSettings.domain = 'enterprise-attack-13';
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.layerByOperation();
            expect(component.layerTabs.length).toEqual(2);
        });

        it('should create new layer by operation based on user input when data is loaded errors', async () => {
            component.opSettings.scoreExpression = 'a+b+2';
            expect(component.getScoreExpressionError()).toEqual('Variable b does not match any layers');
            let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
            let vm2 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-12');
            component.openTab('layer', vm1, true, true, true, true);
            component.openTab('layer2', vm2, true, true, true, true);

            component.dataService.setUpDomains(MockData.configDataExtended.entries); // set up data
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.dataService.parseBundles(component.dataService.getDomain('enterprise-attack-13'), MockData.stixBundleSDO); //load the data
            component.opSettings.domain = 'enterprise-attack-13';
            let alertSpy = spyOn(window, 'alert');
            let consoleSpy = spyOn(console, 'error');
            component.layerByOperation();
            expect(consoleSpy).toHaveBeenCalled();
            expect(alertSpy).toHaveBeenCalled();
        });
    });

    describe('versionUpgradeDialog', () => {
        it('should upgrade layer', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(
                Promise.resolve({ oldID: 'enterprise-attack-12', newID: 'enterprise-attack-13' })
            );
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(Promise.resolve(null));
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer with domain data loaded', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.dataService.parseBundles(component.dataService.getDomain('enterprise-attack-13'), MockData.stixBundleSDO);
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
            let st1 = new Technique(MockData.T0000_000, [], null);
            let t1 = new Technique(MockData.T0000, [st1], null);
            let tvm_1 = new TechniqueVM('T0000^tactic-name');
            tvm_1.showSubtechniques = true;
            let stvm_1 = new TechniqueVM('0000.000^tactic-name');
            vm1.setTechniqueVM(tvm_1);
            vm1.setTechniqueVM(stvm_1);
            component.dataService.domains[0].techniques.push(t1);
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(Promise.resolve(null));
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));
    });

    describe('upgradeLayer', () => {
        it('should upgrade layer', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(
                Promise.resolve({ oldID: 'enterprise-attack-12', newID: 'enterprise-attack-13' })
            );
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(Promise.resolve(null));
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer with default layer enabled', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, true);
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer with default layer enabled and domain data loaded', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.dataService.parseBundles(component.dataService.getDomain('enterprise-attack-13'), MockData.stixBundleSDO);
            let bb = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, bb, false, true);
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));

        it('should not upgrade layer with domain data loaded', waitForAsync(() => {
            component.dataService.setUpDomains(MockData.configDataExtended.entries);
            component.dataService.latestVersion = new Version('enterprise-attack-13', '13');
            component.dataService.parseBundles(component.dataService.getDomain('enterprise-attack-13'), MockData.stixBundleSDO);
            let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
            let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
            let st1 = new Technique(MockData.T0000_000, [], null);
            let t1 = new Technique(MockData.T0000, [st1], null);
            let tvm_1 = new TechniqueVM('T0000^tactic-name');
            tvm_1.showSubtechniques = true;
            let stvm_1 = new TechniqueVM('0000.000^tactic-name');
            vm1.setTechniqueVM(tvm_1);
            vm1.setTechniqueVM(stvm_1);
            component.dataService.domains[0].techniques.push(t1);
            let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(Promise.resolve(null));
            spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
            component.upgradeLayer(vm1, layer, false, false).then(() => {
                expect(versionUpgradeSpy).toHaveBeenCalled();
            });
            fixture.whenStable().then(() => {
                expect(component.layerTabs.length).toEqual(2);
            });
        }));
    });

    describe('loadLayerFromURL', () => {
        it('should throw errors when loading from url', waitForAsync(() => {
            let versions = [
                {
                    name: 'ATT&CK v13',
                    version: '13',
                    domains: [
                        {
                            name: 'Mobile',
                            identifier: 'mobile-attack',
                            data: ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v13.1/mobile-attack/attack-attack.json'],
                        },
                    ],
                },
            ];
            component.dataService.setUpDomains(versions);
            component.dataService.latestVersion = new Version('mobile-attack-13', '13');
            component.http = http;
            spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
            let alertSpy = spyOn(window, 'alert');
            let consoleSpy = spyOn(console, 'error');
            component
                .loadLayerFromURL('https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/samples/Bear_APT.json', false)
                .then(() => {
                    expect(consoleSpy).toHaveBeenCalled();
                    expect(alertSpy).toHaveBeenCalled();
                });
        }));
    });
});
