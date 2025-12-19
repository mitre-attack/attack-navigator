import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { deleteCookie, getCookie, hasCookie, setCookie } from './utils/cookies';
import { TabsComponent } from './tabs/tabs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfigService } from './services/config.service';
import { MatTabsModule } from '@angular/material/tabs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: any;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatSnackBarModule, MatTabsModule, TabsComponent, AppComponent],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();

        // set up config service
        let configService = TestBed.inject(ConfigService);
        configService.defaultLayers = { enabled: false };

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
    }));

    it('should create the app', waitForAsync(() => {
        expect(app).toBeTruthy();
    }));

    it('should intialize title', waitForAsync(() => {
        app.ngOnInit();
        let result = app.titleService.getTitle();
        expect(result).toEqual(app.title);
    }));

    it(`should have title 'ATT&CK® Navigator'`, waitForAsync(() => {
        expect(app.title).toEqual('ATT&CK® Navigator');
    }));

    it('should set user theme to theme-override-dark', waitForAsync(() => {
        setCookie('is_user_theme_dark', 'true', 1);
        // recreate component
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        expect(app.user_theme).toEqual('theme-override-dark');
    }));

    it('should set user theme to theme-override-light', waitForAsync(() => {
        setCookie('is_user_theme_dark', 'false', 1);
        // recreate component
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        expect(app.user_theme).toEqual('theme-override-light');
    }));

    it('should set user theme to theme-use-system', waitForAsync(() => {
        deleteCookie('is_user_theme_dark');
        // recreate component
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        expect(app.user_theme).toEqual('theme-use-system');
    }));

    it('should handle dark theme change', waitForAsync(() => {
        app.themeChangeHandler('dark');
        expect(app.user_theme).toEqual('theme-override-dark');
        expect(hasCookie('is_user_theme_dark')).toBeTrue();
        expect(getCookie('is_user_theme_dark')).toEqual('true');
    }));

    it('should handle light theme change', waitForAsync(() => {
        app.themeChangeHandler('light');
        expect(app.user_theme).toEqual('theme-override-light');
        expect(hasCookie('is_user_theme_dark')).toBeTrue();
        expect(getCookie('is_user_theme_dark')).toEqual('false');
    }));

    it('should handle system theme change', waitForAsync(() => {
        setCookie('is_user_theme_dark', 'true', 1);

        app.themeChangeHandler('system');
        expect(app.user_theme).toEqual('theme-use-system');
        expect(hasCookie('is_user_theme_dark')).toBeFalse();
    }));

    it('should prompt to navigate away', waitForAsync(() => {
        app.configService.setFeature('leave_site_dialog', true);
        let prompt = 'Are you sure you want to navigate away? Your data may be lost!';
        let event$ = { returnValue: null };
        app.promptNavAway(event$);
        expect(event$.returnValue).toEqual(prompt);
    }));

    it('should not prompt to navigate away', waitForAsync(() => {
        app.configService.setFeature('leave_site_dialog', false);
        let event$ = { returnValue: null };
        app.promptNavAway(event$);
        expect(event$.returnValue).toEqual(null);
    }));
});
