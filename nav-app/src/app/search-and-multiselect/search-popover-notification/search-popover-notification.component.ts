import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverContentComponent, PopoverDirective } from 'ngx-smart-popover';

@Component({
    selector: 'search-popover-notification',
    templateUrl: './search-popover-notification.component.html',
    styleUrls: ['./search-popover-notification.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('mergeIcon', [
            transition("unmerged => merged", [ animate("4s", keyframes([
                style({
                    transform: "translateX(0px)",
                    opacity: 1,
                    offset: 0
                }),
                style({
                    transform: "translateX(0px)",
                    opacity: 1,
                    offset: 0.3
                }),
                style({
                    transform: "translateX(-28px)",
                    opacity: 0.1,
                    offset: 0.7
                }),
                style({
                    transform: "translateX(-28px)",
                    opacity: 0,
                    offset: 1
                })
            ]))])
        ])
    ]
})
export class SearchPopoverNotificationComponent implements AfterViewInit {

    @ViewChild("updateNotification", {static: false}) public popover: PopoverContentComponent;
    @ViewChild("popoverTrigger") popoverTrigger: PopoverDirective;
    public animationState: string = "unmerged";

    constructor() { }

    ngAfterViewInit(): void {
        setTimeout(() => this.openPopover(), 2000); //show popover after two seconds
    }

    private openPopover(): void {
        this.popoverTrigger.show();
        // start the animation loop
        setTimeout(() => { this.animationState = "merged"; }, 0)
    }

    onAnimationEnd(event) {
        console.log("animation ended");
        this.animationState = 'unmerged';
        if (event.toState === "unmerged") {
            setTimeout(() => { this.animationState = "merged"; });
        }
    }
}
