import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MarkdownComponent, MarkdownService } from "ngx-markdown";
import { LayerInformationComponent } from "../layer-information/layer-information.component";

@Component({
    selector: 'help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnInit {
    private listenObj: any;
    @ViewChild('markdownElement', {static: false}) private markdownElement: MarkdownComponent;
    public headingAnchors: MarkdownHeadingAnchor[] = [];


    constructor(private dialog: MatDialog,
                private markdownService: MarkdownService,
                private renderer: Renderer2,
                @Inject(MAT_DIALOG_DATA) public data) {}

    ngOnInit(): void {
        setTimeout(() => {
           this.scrollTo('toc');
        }, 175);

        let self = this;
        this.markdownService.renderer.heading = (text: string, level: number) => {
            let img = text.match(/(<img src(.*?)>)/g) ? text.match(/(<img src(.*?)>)/g)[0].replace(/(nav-app\/src\/)/g, '') : '';
            text = text.replace(/(<img src(.*?)>)/g, '');
            const escapedText = text.toLowerCase().trim().replace(/[^\w]+/g, '-');
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
        // hijack clicks on links
        if (this.markdownElement) {
            this.listenObj = this.renderer.listen(this.markdownElement.element.nativeElement, 'click', (e: Event) => {
                if (e.target && (e.target as any).tagName === 'A') {
                    const el = (e.target as HTMLElement);
                    const linkURL = el.getAttribute && el.getAttribute('href');
                    if (linkURL) {
                        e.preventDefault();
                        if (linkURL.charAt(0) === '#') this.scrollTo(linkURL.replace('#', ''));
                        else if (linkURL.includes('layers/')) this.openLayerDialog();
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
        if (element) element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }

    /**
     * open the layer information dialog
     */
    openLayerDialog() {
        this.dialog.open(LayerInformationComponent, {
            maxWidth: "90ch"
        });
    }
}


interface MarkdownHeadingAnchor {
    level: number,
    anchor: string,
    label: string
}
