import { Component, OnInit } from '@angular/core';
import * as globals from "../globals";
@Component({
    selector: 'help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    nav_version: string = globals.nav_version;
    constructor() { }

}
