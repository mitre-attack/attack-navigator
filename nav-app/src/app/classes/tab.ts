import { ViewModel } from './view-model';

export class Tab {
    public title: string;
    public viewModel: ViewModel;
    public domain: string = '';
    public isDataTable: boolean;
    public isCloseable: boolean = false;
    public showScoreVariables: boolean = false;

    constructor(title: string, isCloseable: boolean, showScoreVariables: boolean, domain: string, isDataTable: boolean) {
        this.title = title;
        this.isCloseable = isCloseable;
        this.showScoreVariables = showScoreVariables;
        this.domain = domain;
        this.isDataTable = isDataTable;
    }
}
