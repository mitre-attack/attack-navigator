import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionUpgradeComponent } from './version-upgrade.component';

describe('VersionUpgradeComponent', () => {
  let component: VersionUpgradeComponent;
  let fixture: ComponentFixture<VersionUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
