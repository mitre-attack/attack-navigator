import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSettingsComponent } from './layer-settings.component';

describe('LayerSettingsComponent', () => {
  let component: LayerSettingsComponent;
  let fixture: ComponentFixture<LayerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
