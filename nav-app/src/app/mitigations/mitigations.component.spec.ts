import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DataService } from '../data.service';
import { MitigationsComponent } from "./mitigations.component";
import dataServiceConfig from '../../assets/config.json';
import enterpriseAttackBundle from '../../assets/enterprise-bundle.json';

describe("MitigationsComponent", () => {
  let component: MitigationsComponent;
  let fixture: ComponentFixture<MitigationsComponent>;

  let mockViewModel = jasmine.createSpyObj('ViewModel', { domain: [] })
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MitigationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(inject([DataService], async (service: DataService) => {
    dataService = service

    fixture = TestBed.createComponent(MitigationsComponent);
    component = fixture.componentInstance;
    component.viewModel = mockViewModel
    fixture.detectChanges();

    service.setUpURLs(dataServiceConfig.versions as []);
    let domain = dataService.getDomain("enterprise-attack-v9")
    service.parseBundle(domain, enterpriseAttackBundle as []);
  }));

  it('should ...', () => {
    expect(component).toBeTruthy();
  });

})