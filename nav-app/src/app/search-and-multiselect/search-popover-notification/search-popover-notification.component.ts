import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverDirective } from 'ngx-smart-popover';

import * as moment from 'moment';
import { setCookie, getCookie, hasCookie } from '../../cookies';

// TODO make sure this is actually the release date!
const MONTH_AFTER_RELEASE = moment('2021-08-11', 'YYYY-MM-DD').add(1, 'months');

@Component({
    selector: 'search-popover-notification',
    templateUrl: './search-popover-notification.component.html',
    styleUrls: ['./search-popover-notification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('mergeIconLeft', [
            transition("unmerged => merged", [ animate("3s ease-out", keyframes([
                style({
                    transform: "translate(0px, 0px)",
                    offset: 0
                }),
                style({
                    transform: "translate(0px, 0px)",
                    offset: 0.3
                }),
                style({
                    transform: "translate(14px, -7px)",
                    offset: 0.7
                }),
                style({
                    transform: "translate(14px, -10px)",
                    offset: 1
                })
            ]))])
        ]),
        trigger('mergeIconRight', [
            transition("unmerged => merged", [ animate("3s ease-out", keyframes([
                style({
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                    offset: 0
                }),
                style({
                    transform: "translate(0px, 0px)",
                    opacity: 1,
                    offset: 0.3
                }),
                style({
                    transform: "translate(-14px, -7px)",
                    opacity: 0.2,
                    offset: 0.7
                }),
                style({
                    transform: "translate(-14px, -7px)",
                    opacity: 0.0,
                    offset: 0.8
                }),
                style({
                    transform: "translate(-14px, -10px)",
                    opacity: 0,
                    offset: 1
                })
            ]))])
        ])
    ]
})
export class SearchPopoverNotificationComponent implements AfterViewInit {

    @ViewChild("popoverTrigger") popoverTrigger: PopoverDirective;
    public animationState: string = "unmerged";

    constructor() { }

    ngAfterViewInit(): void {
        let is_before_expiration = moment().isBefore(MONTH_AFTER_RELEASE)
        let has_seen_before = hasCookie("seenSearchUpdateNotification") && getCookie("seenSearchUpdateNotification") == "true";
        //show only if we are within one month of release and we haven't dismissed the popup before
        if (is_before_expiration && !has_seen_before)  {
            setTimeout(() => this.openPopover(), 2000); //show popover after two seconds to allow page to load
        }
    }

    private openPopover(): void {
        this.popoverTrigger.show();
        // start the animation loop
        setTimeout(() => { this.animationState = "merged"; }, 0)
    }

    public closePopover(): void {
        this.popoverTrigger.hide();
        // make sure the popover doesn't show on subsequent loads
        // save cookie for one month plus one day so that first-day users won't see it on the last day
        setCookie("seenSearchUpdateNotification", "true", 33); 
    }

    onAnimationEnd(event) {
        //restart the animation
        this.animationState = 'unmerged';
        if (event.toState === "unmerged") {
            setTimeout(() => { this.animationState = "merged"; });
        }
    }
}
