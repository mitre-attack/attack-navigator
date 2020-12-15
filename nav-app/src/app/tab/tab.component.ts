import { Component } from '@angular/core';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {
    // PROPERTIES & DEFAULTS
    title: string;
    dataContext;
    domain: string = "";
    isDataTable: boolean;

    active: boolean = false;
    isCloseable: boolean = false;
    showScoreVariables: boolean = false;

    constructor(title: string, isCloseable: boolean, showScoreVariables: boolean, domain: string, dataTable: boolean) {
        this.title = title;
        this.isCloseable = isCloseable;
        this.showScoreVariables = showScoreVariables;
        this.domain = domain;
        this.isDataTable = dataTable;
    }

}
