import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerUpgradeComponent } from './layer-upgrade.component';

describe('LayerUpgradeComponent', () => {
  let component: LayerUpgradeComponent;
  let fixture: ComponentFixture<LayerUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerUpgradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
