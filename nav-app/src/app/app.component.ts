import { Component, ViewChild, DoCheck, HostListener } from '@angular/core';
import {TabsComponent} from './tabs/tabs.component';
import * as globals from "./globals";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(TabsComponent) tabsComponent;

    nav_version: string = globals.nav_version;

    @HostListener('window:beforeunload', ['$event'])
    promptNavAway($event) {
        //this text only shows in the data, not visible to user as far as I can tell
        //however, if it's not included the window doesn't open.
        $event.returnValue='Are you sure you want to navigate away? Your data may be lost!';
    }

    constructor() {
        Array.prototype.includes = function(value): boolean {
            // console.log("checking include")
            for (let i = 0; i < this.length; i++) {
                if (this[i] === value) return true
            }
            return false;
        }
    }


}
