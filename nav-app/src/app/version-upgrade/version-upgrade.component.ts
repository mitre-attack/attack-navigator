import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ViewModelsService } from '../services/viewmodels.service';
import { DataService } from '../services/data.service';
import * as globals from '../utils/globals';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-version-upgrade',
    templateUrl: './version-upgrade.component.html',
    styleUrls: ['./version-upgrade.component.scss'],
    providers: [ViewModelsService],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, NgIf, MatDialogActions, MatButton],
})
export class VersionUpgradeComponent implements OnInit {
    navVersion = globals.navVersion;
    currVersion: string;
    vmVersion: string;
    layerName: string;

    constructor(
        public dialogRef: MatDialogRef<VersionUpgradeComponent>,
        public dataService: DataService,
        private viewModelsService: ViewModelsService,
        @Inject(MAT_DIALOG_DATA) public data
    ) {}

    ngOnInit() {
        this.currVersion = this.data.currVersion;
        this.vmVersion = this.data.vmVersion;
        this.layerName = this.data.layerName;
    }

    upgradeVersion(upgrade: boolean) {
        this.dialogRef.close({ upgrade: upgrade });
    }
}
