// https://embed.plnkr.co/wWKnXzpm8V31wlvu64od/s
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {
    @Input('tabTitle') title: string;
    @Input() active = false;
    @Input() isCloseable = false;
    @Input() template;
    @Input() dataContext;
    @Input() showScoreVariables = false;
    @Input() domain = "";
    @Input() isDataTable: boolean;

}
