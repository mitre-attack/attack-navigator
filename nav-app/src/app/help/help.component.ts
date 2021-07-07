import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as globals from "../globals";
import { MarkdownComponent, MarkdownService } from "ngx-markdown";

@Component({
    selector: 'help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnInit {
    private listenObj: any;
    nav_version: string = globals.nav_version;
    @ViewChild('markdownElement', {static: false}) private markdownElement: MarkdownComponent;
    public headingAnchors: MarkdownHeadingAnchor[] = [];


    constructor(private markdownService: MarkdownService,
                private renderer: Renderer2,
                private dialogRef: MatDialogRef<HelpComponent>,
                @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit(): void {
        setTimeout(() => {
           this.scrollTo('toc');
        }, 175);

        let self = this;
        this.markdownService.renderer.heading = (text: string, level: number) => {
            let img = text.match(/(<img src(.*?)> )/g) ? text.match(/(<img src(.*?)> )/g)[0].replace(/(nav-app\/src\/)/g, '') : '';
            text = text.replace(/(<img src(.*?)> )/g, '');
            const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            self.headingAnchors.push({
                level: level,
                anchor: escapedText,
                label: text.replace("&amp;", "&")
            });
            return '<h' + level + ' class="' + escapedText + '">' + img +
              text +
              '</h' + level + '>';
        }

        this.markdownService.renderer.html = (html: string) => {
            if (!html.match(/(nav-app\/src\/)/g))
                return html;
            return html.replace(/(nav-app\/src\/)/g, '');
        }
    }

    // from https://github.com/jfcere/ngx-markdown/issues/125#issuecomment-518025821
    public onMarkdownLoad(e) {
        // hijack clicks on links to use router navigation
        if (this.markdownElement) {
            this.listenObj = this.renderer.listen(this.markdownElement.element.nativeElement, 'click', (e: Event) => {
                if (e.target && (e.target as any).tagName === 'A') {
                    const el = (e.target as HTMLElement);
                    const linkURL = el.getAttribute && el.getAttribute('href');
                    if (linkURL) {
                        e.preventDefault();
                        if (linkURL.charAt(0) === '#') this.scrollTo(linkURL.replace('#', ''));
                        else if (linkURL.match((/(nav-app\/src\/)/g))) window.open(linkURL.replace(/(nav-app\/src\/)/g, ''))
                        else window.open(linkURL);
                    }
                }
            })
        }
    }

    ngOnDestroy(): void {
        if (this.listenObj) {
            this.listenObj();
        }
    }

    public scrollTo(anchor) {
        let element = document.querySelector("." + anchor);
        console.log('scrolling to', anchor);
        if (element) element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
}


interface MarkdownHeadingAnchor {
    level: number,
    anchor: string,
    label: string
}
