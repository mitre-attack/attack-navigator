import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerInformationComponent } from './layer-information.component';

describe('LayerInformationComponent', () => {
  let component: LayerInformationComponent;
  let fixture: ComponentFixture<LayerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
