import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { VersionUpgradeComponent } from './version-upgrade.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
describe('VersionUpgradeComponent', () => {
    let component: VersionUpgradeComponent;
    let fixture: ComponentFixture<VersionUpgradeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, VersionUpgradeComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: {
                        close() {
                            return {};
                        },
                    },
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VersionUpgradeComponent);
        component = fixture.componentInstance;
        component.data.currVersion = '4.9';
        component.data.vmVersion = '4.8';
        component.data.layerName = 'test1';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should upgrade version', () => {
        const openDialogSpy = spyOn(component.dialogRef, 'close');
        component.upgradeVersion(true);
        expect(openDialogSpy).toHaveBeenCalledWith({
            upgrade: true,
        });
    });
});
