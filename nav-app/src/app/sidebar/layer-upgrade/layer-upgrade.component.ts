import { Component, Input, OnInit } from '@angular/core';
import { BaseStix, VersionChangelog } from '../../data.service';

@Component({
    selector: 'layer-upgrade',
    templateUrl: './layer-upgrade.component.html',
    styleUrls: ['./layer-upgrade.component.scss']
})
export class LayerUpgradeComponent implements OnInit {
    @Input() changelog: VersionChangelog<BaseStix>;
    public showUnannotated: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
