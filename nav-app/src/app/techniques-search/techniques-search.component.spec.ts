import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TechniquesSearchComponent } from './techniques-search.component';

describe('TechniquesSearchComponent', () => {
  let component: TechniquesSearchComponent;
  let fixture: ComponentFixture<TechniquesSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TechniquesSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechniquesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
