import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPopoverNotificationComponent } from './search-popover-notification.component';

describe('SearchPopoverNotificationComponent', () => {
  let component: SearchPopoverNotificationComponent;
  let fixture: ComponentFixture<SearchPopoverNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPopoverNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPopoverNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
