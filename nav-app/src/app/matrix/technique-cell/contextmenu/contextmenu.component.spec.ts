import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContextmenuComponent } from './contextmenu.component';

describe('ContextmenuComponent', () => {
    let contextMenu: ContextmenuComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ContextmenuComponent],
        }).compileComponents();
        let fixture = TestBed.createComponent(ContextmenuComponent);
        contextMenu = fixture.componentInstance;
    }));

    it('should create the app', (() => {
        expect(contextMenu).toBeTruthy();
    }));
});
