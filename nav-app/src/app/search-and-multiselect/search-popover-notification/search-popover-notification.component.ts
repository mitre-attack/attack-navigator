import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverContentComponent, PopoverDirective } from 'ngx-smart-popover';

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
        setTimeout(() => this.openPopover(), 2000); //show popover after two seconds
    }

    private openPopover(): void {
        this.popoverTrigger.show();
        // start the animation loop
        setTimeout(() => { this.animationState = "merged"; }, 0)
    }

    public closePopover(): void {
        this.popoverTrigger.hide();
    }

    onAnimationEnd(event) {
        //restart the animation
        this.animationState = 'unmerged';
        if (event.toState === "unmerged") {
            setTimeout(() => { this.animationState = "merged"; });
        }
    }
}
