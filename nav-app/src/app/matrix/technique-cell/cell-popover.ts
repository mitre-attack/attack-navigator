import { ElementRef } from "@angular/core";

export abstract class CellPopover {
    private theElement: any;
    constructor(element: ElementRef) {
        this.theElement = element.nativeElement;
    }

    /**
     * Get the location of the tooltip according to the location on the screen. 
     * Returns one of the following:
     * "top left":
     * ------------------
     * |    XXXX      |
     * |    XXXX      |
     * |       X      |
     * |              |
     * ------------------
     * "top right":
     * ------------------
     * |        XXXX  |
     * |        XXXX  |
     * |       X      |
     * |              |
     * ------------------
     * "bottom left":
     * ------------------
     * |                |
     * |  XXXX X        |
     * |  XXXX          |
     * ------------------
     * "bottom right":
     * ------------------
     * |                |
     * |       X XXXX   |
     * |         XXXX   |
     * ------------------
     * @returns {string} direction
     */
    protected getPosition(): string {
        let boundingRect = this.theElement.getBoundingClientRect();
        let halfWidth = window.innerWidth / 2;
        let halfHeight = window.innerHeight / 2;
        let position = [];
        if (boundingRect.right > halfWidth) position.push("left");
        else                               position.push("right");
        if (boundingRect.bottom > halfHeight) position.push("top");
        else                               position.push("bottom");
        return position.join(" ");
    }
}