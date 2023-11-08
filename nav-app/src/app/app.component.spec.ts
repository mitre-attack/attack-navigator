import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { deleteCookie, getCookie, hasCookie, setCookie } from './utils/cookies';
import { TabsComponent } from './tabs/tabs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatDialogModule,
                MatSnackBarModule
            ],
            declarations: [
                AppComponent,
                TabsComponent,
            ],
        }).compileComponents();
    }));

    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should intialize title', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        appComponent.ngOnInit();
        let result = appComponent.titleService.getTitle();
        expect(result).toEqual(appComponent.title);
    }));

    it(`should have title 'ATT&CK® Navigator'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('ATT&CK® Navigator');
    }));

    it('should set user theme to theme-override-dark', waitForAsync(() => {
        setCookie('is_user_theme_dark', 'true', 1);
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        expect(appComponent.user_theme).toEqual('theme-override-dark');
    }));

    it('should set user theme to theme-override-light', waitForAsync(() => {
        setCookie('is_user_theme_dark', 'false', 1);
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        expect(appComponent.user_theme).toEqual('theme-override-light');
    }));

    it('should set user theme to theme-use-system', waitForAsync(() => {
        deleteCookie('is_user_theme_dark');
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        expect(appComponent.user_theme).toEqual('theme-use-system');
    }));

    it('should handle dark theme change', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        appComponent.themeChangeHandler('dark');
        expect(appComponent.user_theme).toEqual('theme-override-dark');
        expect(hasCookie('is_user_theme_dark')).toBeTrue();
        expect(getCookie('is_user_theme_dark')).toEqual('true');
    }));

    it('should handle light theme change', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        appComponent.themeChangeHandler('light');
        expect(appComponent.user_theme).toEqual('theme-override-light');
        expect(hasCookie('is_user_theme_dark')).toBeTrue();
        expect(getCookie('is_user_theme_dark')).toEqual('false');
    }));

    it('should handle system theme change', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        setCookie('is_user_theme_dark', 'true', 1);

        appComponent.themeChangeHandler('system');
        expect(appComponent.user_theme).toEqual('theme-use-system');
        expect(hasCookie('is_user_theme_dark')).toBeFalse();
    }));

    it('should prompt to navigate away', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        appComponent.configService.setFeature('leave_site_dialog', true);
        let prompt = 'Are you sure you want to navigate away? Your data may be lost!';
        let event$ = {returnValue: null};
        appComponent.promptNavAway(event$);
        expect(event$.returnValue).toEqual(prompt);
    }));

    it('should not prompt to navigate away', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const appComponent = fixture.componentInstance;
        appComponent.configService.setFeature('leave_site_dialog', false);
        let event$ = {returnValue: null};
        appComponent.promptNavAway(event$);
        expect(event$.returnValue).toEqual(null);
    }));
});
