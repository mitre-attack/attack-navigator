import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TabsComponent } from './tabs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { DataService } from '../services/data.service';
import { Filter, Gradient, Link, Metadata, TechniqueVM, ViewModel } from '../classes';
import { HelpComponent } from '../help/help.component';
import { SvgExportComponent } from '../svg-export/svg-export.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangelogComponent } from '../changelog/changelog.component';
import { LayerInformationComponent } from '../layer-information/layer-information.component';
import * as is from 'is_js';
import { HttpClient } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Technique } from '../classes/stix';
import * as MockLayers from '../../tests/utils/mock-layers';
import * as MockData from '../../tests/utils/mock-data';

describe('TabsComponent', () => {
    let component: any;
    let fixture: ComponentFixture<TabsComponent>;
    let snackBar: MatSnackBar;
    let httpClient: HttpClient;
    let viewModel: ViewModel;
    let bundles: any[] = [
        {
            type: 'bundle',
            id: 'bundle--0',
            spec_version: '2.0',
            objects: [],
        },
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule, MarkdownModule.forRoot({ loader: HttpClient })],
            declarations: [TabsComponent],
            providers: [
                {
                    provide: MatSnackBar,
                    useValue: {
                        open() {
                            return {
                                onAction: () => of({}),
                            };
                        },
                    },
                },
                DataService,
                MarkdownService,
            ],
        }).compileComponents();
        snackBar = TestBed.inject(MatSnackBar);
        httpClient = TestBed.inject(HttpClient);
        fixture = TestBed.createComponent(TabsComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        viewModel = new ViewModel('layer', '1', 'enterprise-attack-13', null);
    }));

    it('should set up data in constructor', () => {
        spyOn(DataService.prototype, 'setUpURLs').and.stub();
        spyOn(DataService.prototype, 'getConfig').and.returnValue(of(MockData.configData));
        TabsComponent.prototype.subscription = new Subscription();
        spyOn(TabsComponent.prototype, 'getNamedFragmentValue').and.returnValues(
            ['https://raw.githubusercontent.com/mitre/cti/ATT%26CK-v14.1/enterprise-attack/enterprise-attack.json'],
            ['13'],
            ['defending-iaas'],
            ['https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json']
        );
        expect(component).toBeTruthy();
    });

    it('should create new tab', () => {
        component.newBlankTab();
        expect(component.layerTabs.length).toEqual(1);
    });

    it('should close all open tabs and create new one', () => {
        let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
        vm1.sidebarContentType = 'search';
        component.openTab('new layer 1', vm1, true, true, true, true);
        component.openTab('new tab', viewModel, true, true, true, true);
        component.openTab('new tab', viewModel, true, true, true, true);
        component.openTab('new layer 1', viewModel, true, true, false, true);
        component.closeTab(component.layerTabs[0]);
        component.closeTab(component.layerTabs[0]);
        expect(component.layerTabs.length).toEqual(1);
    });

    it('should close one tab', () => {
        component.openTab('new layer1', viewModel, true, true, true, true);
        component.openTab('new layer', viewModel, true, true, true, true);
        component.closeTab(component.layerTabs[0]);
        expect(component.layerTabs.length).toEqual(1);
    });

    it('should set the active tab to the latest created tab', () => {
        component.openTab('new layer', viewModel, true, true, true, true);
        component.openTab('new layer1', viewModel, true, true, true, true);
        component.selectTab(component.layerTabs[1]);
        component.closeTab(component.layerTabs[1]);
        component.openTab('new layer2', viewModel, true, true, true, true);
        expect(component.activeTab.title).toEqual('new layer2');
    });

    it('should close the latest created tab', () => {
        component.openTab('new layer', viewModel, true, true, true, true);
        component.openTab('new layer1', viewModel, true, true, true, true);
        component.openTab('new layer2', viewModel, true, true, true, true);
        component.closeTab(component.layerTabs[0]); //closes new layer 2
        expect(component.isAlphabetical('newlayer')).toEqual(true);
        expect(component.activeTab.title).toEqual('new layer1');
    });

    it('should create new layer', () => {
        component.dataService.setUpURLs(MockData.configData);
        expect(component.latestDomains.length).toEqual(1);
        component.newLayer('enterprise-attack-13');
        expect(component.layerTabs.length).toEqual(1);
        component.newLayer('enterprise-attack-13', JSON.parse(JSON.stringify(MockLayers.layerFile1)));
        expect(component.layerTabs.length).toEqual(2);
    });

    it('should check if feature is defined in config file', () => {
        component.configService.setFeature_object(MockData.configTechniqueControls);
        expect(component.hasFeature('manual_color')).toBeTrue();
    });

    it('should open dialog', () => {
        const openDialogSpy = spyOn(component.dialog, 'open');
        component.openDialog('layers');
        expect(openDialogSpy).toHaveBeenCalledWith(LayerInformationComponent, {
            maxWidth: '90ch',
        });
        component.openDialog('help');
        const settings = { maxWidth: '75ch', panelClass: component.userTheme };
        expect(openDialogSpy).toHaveBeenCalledWith(HelpComponent, settings);
        component.openDialog('changelog');
        expect(openDialogSpy).toHaveBeenCalledWith(ChangelogComponent, settings);
        spyOn(is, 'safari').and.returnValue(true);
        component.ngAfterViewInit();
        expect(openDialogSpy).toHaveBeenCalledWith(component.safariWarning, {
            width: '350px',
            disableClose: true,
            panelClass: component.userTheme,
        });
    });

    it('should open svg dialog', () => {
        const openDialogSpy = spyOn(component.dialog, 'open');
        component.openSVGDialog(viewModel);
        const settings = {
            data: { vm: viewModel },
            panelClass: ['dialog-custom', component.userTheme],
        };
        expect(openDialogSpy).toHaveBeenCalledWith(SvgExportComponent, settings);
    });

    it('should adjust the height', () => {
        component.adjustHeader(5);
        expect(component.adjustedHeaderHeight).toEqual(5);
    });

    it('should handle tab click', () => {
        component.newBlankTab();
        component.handleTabClick(component.layerTabs[0]);
        component.newBlankTab();
        component.handleTabClick(component.layerTabs[0]);
        expect(component.activeTab).toEqual(component.layerTabs[0]);
    });

    it('should handle links', () => {
        component.customizedConfig = [
            {
                name: 'technique_controls',
                enabled: true,
                description: 'Disable to disable all subfeatures',
                subfeatures: [{ name: 'disable_techniques', enabled: false, description: 'Disable to remove the ability to disable techniques.' }],
            },
            { name: 'sticky_toolbar', enabled: false },
        ];
        expect(component.getNamedFragmentValue('sticky_toolbar')).toEqual([]);
        expect(component.getNamedFragmentValue('sticky_toolbar', 'https://mitre-attack.github.io/attack-navigator/#sticky_toolbar=false')).toEqual([
            'false',
        ]);
        expect(component.trackByFunction(1)).toEqual(1);
        component.addLayerLink();
        expect(component.layerLinkURLs.length).toEqual(1);
        component.addLayerLink();
        component.removeLayerLink(1);
        expect(component.layerLinkURLs.length).toEqual(1);
        component.getLayerLink();
        component.removeLayerLink(0);
        let url_string = component.getLayerLink();
        expect(url_string).toContain('disable_techniques=false&sticky_toolbar=false');
    });

    it('should create new layer by operation based on user input', async () => {
        component.opSettings.scoreExpression = 'a+b';
        component.opSettings.domain = 'enterprise-atack-13';
        let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
        let vm2 = component.viewModelsService.newViewModel('layer1', 'enterprise-attack-13');
        component.openTab('layer', vm1, true, true, true, true);
        component.openTab('layer1', vm2, true, true, true, true);
        expect(component.getScoreExpressionError()).toEqual('Layer b does not match the chosen domain');
        component.dataService.setUpURLs(MockData.configData); // set up data
        component.opSettings.domain = 'enterprise-attack-13';
        expect(component.getFilteredVMs()).toEqual(component.viewModelsService.viewModels);
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        component.dataService.getDomain(component.opSettings.domain).dataLoaded = false;
        await component.layerByOperation();
        expect(component.layerTabs.length).toEqual(3);
    });

    it('should create new layer by operation based on user input when data is loaded', async () => {
        component.opSettings.scoreExpression = 'a+2';
        let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
        component.openTab('layer', vm1, true, true, true, true);
        expect(component.getScoreExpressionError()).toEqual(null);
        component.dataService.setUpURLs(MockData.configData); // set up data
        component.dataService.parseBundle(component.dataService.getDomain('enterprise-attack-13'), bundles); //load the data
        component.opSettings.domain = 'enterprise-attack-13';
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        await component.layerByOperation();
        expect(component.layerTabs.length).toEqual(2);
    });

    it('should emit on theme change', () => {
        spyOn(component.onUserThemeChange, 'emit');
        component.handleUserThemeChange('dark');
        expect(component.onUserThemeChange.emit).toHaveBeenCalled();
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

    it('should test toggle in filter', () => {
        let filter = new Filter();
        filter.platforms.options = ['Linux', 'macOS', 'Windows'];
        filter.platforms.selection = ['Linux'];
        expect(filter.inFilter('platforms', 'Linux')).toEqual(true);
        filter.toggleInFilter('platforms', 'Linux');
        expect(filter.platforms.selection).toEqual([]);
        filter.toggleInFilter('platforms', 'macOS');
        expect(filter.platforms.selection).toEqual(['macOS']);
        filter.deserialize(JSON.stringify(MockLayers.layerFile1.filters.platforms));
        let consoleSpy = spyOn(console, 'error');
        filter.toggleInFilter('platforms', 'PRE');
        expect(consoleSpy).toHaveBeenCalledWith(
            'not a valid option to toggle',
            'PRE',
            Object({ selection: ['macOS'], options: ['Linux', 'macOS', 'Windows'] })
        );
    });

    it('should throw errors for filters', () => {
        let filter = new Filter();
        let filter_error_file1 = {
            platforms: [3, 4],
        };
        let consoleSpy = spyOn(console, 'error');
        filter.deserialize(filter_error_file1);
        expect(consoleSpy).toHaveBeenCalledWith('TypeError:', 3, '(', 'number', ')', 'is not a string');
    });

    it('should throw errors for gradient', () => {
        let filter = new Gradient();
        let filter_error_file1 = {
            colors: [3, 4],
        };
        let consoleSpy = spyOn(console, 'error');
        filter.deserialize(JSON.stringify(filter_error_file1));
        expect(consoleSpy).toHaveBeenCalledWith('TypeError:', 3, '(', 'number', ')', 'is not a color-string');
    });

    it('should display warning dialog for major version mismatches', () => {
        const dialogSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) });
        component.versionMismatchWarning('3.4', '4.4');
        expect(dialogSpy).toHaveBeenCalled();
    });

    it('should display warning snackbar for minor version mismatches', () => {
        spyOn(snackBar, 'open').and.callThrough();
        component.versionMismatchWarning('4.2', '4.5');
        expect(snackBar.open).toHaveBeenCalled();
    });

    it('should read and open json file', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let mockedDocElement = document.createElement('input');
        mockedDocElement.id = 'uploader';
        mockedDocElement.value = 'test1';
        mockedDocElement.type = 'text';
        document.getElementById = jasmine.createSpy('uploader').and.returnValue(mockedDocElement);
        const logSpy = spyOn(mockedDocElement, 'click');
        component.openUploadPrompt();
        expect(logSpy).toHaveBeenCalled();
        let blob = new Blob([JSON.stringify(MockLayers.layerFile2)], { type: 'text/json' });
        let file = new File([blob], 'layer-2.json');
        component.readJSONFile(file).then(() => {
            expect(component.layerTabs.length).toEqual(1);
        });
        let layer = MockLayers.layerFile2;
        layer.viewMode = 2;
        blob = new Blob([JSON.stringify(layer)], { type: 'text/json' });
        file = new File([blob], 'layer-2.json');
        component.readJSONFile(file).then(() => {
            expect(component.layerTabs.length).toEqual(2);
        });
        layer.viewMode = 0;
        blob = new Blob([JSON.stringify(layer)], { type: 'text/json' });
        file = new File([blob], 'layer-2.json');
        component.readJSONFile(file).then(() => {
            expect(component.layerTabs.length).toEqual(3);
        });
    }));

    it('should get unique layer names', () => {
        component.dataService.setUpURLs(MockData.configData);
        expect(component.latestDomains.length).toEqual(1);
        component.newLayer('enterprise-attack-13');
        component.newLayer('enterprise-attack-13');
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
        let vm1_name = component.getUniqueLayerName('layer');
        component.openTab(vm1_name, vm1, true, true, true, true);
        expect(component.layerTabs.length).toEqual(3);
    });

    it('should upgrade layer', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
        let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(
            Promise.resolve({ oldID: 'enterprise-attack-12', newID: 'enterprise-attack-13' })
        );
        spyOn(component.dataService, 'loadDomainData').and.returnValue(of(null));
        component.upgradeLayer(vm1, layer, false, false).then(() => {
            expect(versionUpgradeSpy).toHaveBeenCalled();
        });
        fixture.whenStable().then(() => {
            expect(component.layerTabs.length).toEqual(1);
        });
    }));

    it('should not upgrade layer', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
        let versionUpgradeSpy = spyOn(component, 'versionUpgradeDialog').and.returnValue(Promise.resolve(null));
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        component.upgradeLayer(vm1, layer, false, false).then(() => {
            expect(versionUpgradeSpy).toHaveBeenCalled();
        });
        fixture.whenStable().then(() => {
            expect(component.layerTabs.length).toEqual(1);
        });
    }));

    it('should not upgrade layer with default layer enabled', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        let layer = JSON.parse(JSON.stringify(MockLayers.layerFile1));
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        component.upgradeLayer(vm1, layer, false, true);
        fixture.whenStable().then(() => {
            expect(component.layerTabs.length).toEqual(1);
        });
    }));

    it('should not upgrade layer with default layer enabled and domain data loaded', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        component.dataService.parseBundle(component.dataService.getDomain('enterprise-attack-13'), bundles);
        let bb = JSON.parse(JSON.stringify(MockLayers.layerFile1));
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        component.upgradeLayer(vm1, bb, false, true);
        fixture.whenStable().then(() => {
            expect(component.layerTabs.length).toEqual(1);
        });
    }));

    it('should not upgrade layer with domain data loaded', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        component.dataService.parseBundle(component.dataService.getDomain('enterprise-attack-13'), bundles);
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
            expect(component.layerTabs.length).toEqual(1);
        });
    }));

    it('should open version upgrade dialog with upgrade', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
        vm1.version = '12';
        const versionUpgradeSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of({ upgrade: true }) });
        component.versionUpgradeDialog(vm1).then(() => {
            expect(versionUpgradeSpy).toHaveBeenCalled();
        });
    }));

    it('should open version upgrade dialog with no upgrade', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configDataExtended);
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-12');
        vm1.version = '12';
        const versionUpgradeSpy = spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of({ upgrade: false }) });
        component.versionUpgradeDialog(vm1).then(() => {
            expect(versionUpgradeSpy).toHaveBeenCalled();
        });
    }));

    it('should serialize viewmodel and only save techniqueVMs which have been modified', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
        vm1.version = '13';
        let st1 = new Technique(MockData.T0000_000, [], null);
        let t1 = new Technique(MockData.T0000, [st1], null);
        let t2 = new Technique(MockData.T0001, [], null);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        tvm_1.score = '3';
        let stvm_1 = new TechniqueVM('T0000.000^tactic-name');
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        vm1.setTechniqueVM(stvm_1);
        component.dataService.domains[0].techniques.push(t1);
        component.dataService.domains[0].techniques.push(t2);
        let m2 = new Metadata();
        m2.name = 'test1';
        m2.value = 't1';
        m2.divider = true;
        vm1.metadata = [m2];
        let l1 = new Link();
        l1.label = 'test1';
        l1.url = 't1';
        let l2 = new Link();
        vm1.links = [l1, l2];
        vm1.serialize();
        tvm_1.showSubtechniques = true;
        vm1.initTechniqueVMs();
        tvm_1.showSubtechniques = false;
        vm1.layout.expandedSubtechniques = 'annotated';
        vm1.initTechniqueVMs();
        vm1.layout.expandedSubtechniques = 'all';
        vm1.initTechniqueVMs();
        expect(component).toBeTruthy();
    }));

    it('should serialize viewmodel and only save techniqueVMs which have been modified and are visible', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
        let t1 = new Technique(MockData.T0000, [], null);
        let t2 = new Technique(MockData.T0001, [], null);
        let tvm_1 = new TechniqueVM('T0000^tactic-name');
        let tvm_2 = new TechniqueVM('T0001^tactic-name');
        tvm_1.isVisible = true;
        tvm_1.score = '3';
        vm1.setTechniqueVM(tvm_1);
        vm1.setTechniqueVM(tvm_2);
        component.dataService.domains[0].techniques.push(t1);
        component.dataService.domains[0].techniques.push(t2);
        vm1.dataService.domains[0].urls = ['https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json'];
        vm1.dataService.domains[0].isCustom = true;
        vm1.serialize(true);
        expect(component).toBeTruthy();
    }));

    it('should throw errors for deserializing viewmodel', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let consoleSpy = spyOn(console, 'error');
        let vm1 = component.viewModelsService.newViewModel('layer2', 'enterprise-attack-13');
        let st1 = new Technique(MockData.T0000_001, [], null);
        vm1.dataService.domains[0].techniques.push(new Technique(MockData.T0000, [st1], null));
        vm1.dataService.domains[0].techniques[0].subtechniques.push(st1);
        vm1.dataService.domains[0].techniques.push(new Technique(MockData.T0002, [], null));
        vm1.deserialize(JSON.stringify(MockLayers.invalidLayerFile1));
        expect(consoleSpy).toHaveBeenCalled();
    }));

    it('should validate input and throw errors', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let layer = JSON.parse(JSON.stringify(MockLayers.invalidLayerFile1));
        let alertSpy = spyOn(window, 'alert');
        let consoleSpy = spyOn(console, 'error');
        component.validateInput(layer, 'enterprise-attack-13');
        expect(consoleSpy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    }));

    it('should validate if the domainVersionID is unique', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let layer = JSON.parse(JSON.stringify(MockLayers.invalidLayerFile1));
        let alertSpy = spyOn(window, 'alert');
        let consoleSpy = spyOn(console, 'error');
        component.validateInput(layer, 'enterprise-attack-13');
        expect(consoleSpy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    }));

    it('should through error for invalid domain', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        spyOn(console, 'error');
        let blob = new Blob([JSON.stringify(MockLayers.layerFile1)], { type: 'text/json' });
        let file = new File([blob], 'layer-2.json');
        component.readJSONFile(file);
        expect(component).toBeTruthy();
    }));

    it('should read and open json file with 2 layers', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        let combined_layer = [MockLayers.layerFile3, MockLayers.layerFile3];
        let blob = new Blob([JSON.stringify(combined_layer)], { type: 'text/json' });
        let file = new File([blob], 'layer-2.json');
        component.readJSONFile(file);
        expect(component).toBeTruthy();
    }));

    it('should create new layer by operation based on user input when data is loaded errors', async () => {
        component.opSettings.scoreExpression = 'a+b+2';
        expect(component.getScoreExpressionError()).toEqual('Variable b does not match any layers');
        let vm1 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-13');
        let vm2 = component.viewModelsService.newViewModel('layer', 'enterprise-attack-12');
        component.openTab('layer', vm1, true, true, true, true);
        component.openTab('layer2', vm2, true, true, true, true);

        component.dataService.setUpURLs(MockData.configDataExtended); // set up data
        component.dataService.parseBundle(component.dataService.getDomain('enterprise-attack-13'), bundles); //load the data
        component.opSettings.domain = 'enterprise-attack-13';
        let alertSpy = spyOn(window, 'alert');
        let consoleSpy = spyOn(console, 'error');
        component.layerByOperation();
        expect(consoleSpy).toHaveBeenCalled();
        expect(alertSpy).toHaveBeenCalled();
    });

    it('should load from url', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        component.http = httpClient;
        spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
        let versionMismatchSpy = spyOn(component, 'versionMismatchWarning').and.returnValue(Promise.resolve([]));
        let upgradeLayerSpy = spyOn(component, 'upgradeLayer').and.returnValue(Promise.resolve([]));
        component
            .loadLayerFromURL('https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json')
            .then(() => {
                expect(versionMismatchSpy).toHaveBeenCalled();
                expect(upgradeLayerSpy).toHaveBeenCalled();
            });
    }));

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
        component.dataService.setUpURLs(versions);
        component.http = httpClient;
        spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
        let versionMismatchSpy = spyOn(component, 'versionMismatchWarning').and.returnValue(Promise.resolve([]));
        let alertSpy = spyOn(window, 'alert');
        let consoleSpy = spyOn(console, 'error');
        component
            .loadLayerFromURL('https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json')
            .then(() => {
                expect(consoleSpy).toHaveBeenCalled();
                expect(alertSpy).toHaveBeenCalled();
                expect(versionMismatchSpy).toHaveBeenCalled();
            });
    }));

    it('should create new layer from url', waitForAsync(() => {
        let loadData = {
            url: 'https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json',
            version: '12',
            identifier: 'enterprise-attack',
        };
        component.dataService.setUpURLs(MockData.configData);
        component.dataService.domains[0].dataLoaded = true;
        component.http = httpClient;
        spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        component.newLayerFromURL(loadData, JSON.parse(JSON.stringify(MockLayers.layerFile1)));
        expect(component.dataService.domains.length).toEqual(2); // mobile-attack-13, enterprise-attack-12
    }));

    it('should load base data from URL', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        component.http = httpClient;
        spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
    }));

    it('should load layer from URL', waitForAsync(() => {
        component.dataService.setUpURLs(MockData.configData);
        component.http = httpClient;
        spyOn(component.http, 'get').and.returnValue(of(MockLayers.layerFile1));
        spyOn(component.dataService, 'loadDomainData').and.returnValue(Promise.resolve());
        let versionMismatchSpy = spyOn(component, 'versionMismatchWarning').and.returnValue(Promise.resolve([]));
        let upgradeLayerSpy = spyOn(component, 'upgradeLayer').and.returnValue(Promise.resolve([]));
        spyOn(component, 'getNamedFragmentValue').and.returnValues(
            [],
            ['13'],
            ['defending-iaas'],
            ['https://raw.githubusercontent.com/mitre-attack/attack-navigator/master/layers/data/samples/Bear_APT.json']
        );
        component.loadTabs(MockData.defaultLayersDisabled).then(() => {
            expect(versionMismatchSpy).toHaveBeenCalled();
            expect(upgradeLayerSpy).toHaveBeenCalled();
        });
    }));
});
