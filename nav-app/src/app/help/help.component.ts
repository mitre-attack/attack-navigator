import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { LayerInformationComponent } from '../layer-information/layer-information.component';
import { Parser } from 'marked';
import { MatButton } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [MatDialogTitle, MatButton, CdkScrollable, MatDialogContent, NgIf, NgFor, MarkdownComponent, MatDialogActions, MatDialogClose],
})
export class HelpComponent implements OnInit {
    private listenObj: any;
    @ViewChild('markdownElement', { static: false }) public markdownElement: any;
    public headingAnchors: MarkdownHeadingAnchor[] = [];

    constructor(
        private dialog: MatDialog,
        private markdownService: MarkdownService,
        private renderer: Renderer2,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
        // intentionally left blank
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.scrollTo('toc');
        }, 175);

        let self = this;
        this.markdownService.renderer.heading = ({ tokens, depth }) => {
            let text = Parser.parseInline(tokens);
            let img = text.match(/(<img src(.*?)>)/g) ? text.match(/(<img src(.*?)>)/g)[0].replace(/(nav-app\/src\/)/g, '') : '';
            text = text.replace(/(<img src(.*?)>)/g, '');
            const escapedText = text
                .toLowerCase()
                .trim()
                .replace(/[^\w]+/g, '-');
            self.headingAnchors.push({
                level: depth,
                anchor: escapedText,
                label: text.replace('&amp;', '&'),
            });
            return `<h${depth} class="${escapedText}">${img}${text}</h${depth}>`;
        };

        this.markdownService.renderer.html = ({ text }) => {
            if (!text.match(/(nav-app\/src\/)/g)) return text;
            return text.replace(/(nav-app\/src\/)/g, '');
        };
    }

    ngOnDestroy(): void {
        if (this.listenObj) {
            this.listenObj();
        }
    }

    // from https://github.com/jfcere/ngx-markdown/issues/125#issuecomment-518025821
    public onMarkdownLoad(e) {
        // hijack clicks on links
        if (this.markdownElement) {
            this.listenObj = this.renderer.listen(this.markdownElement.element.nativeElement, 'click', (e: Event) => {
                if (e.target && (e.target as any).tagName === 'A') {
                    const el = e.target as HTMLElement;
                    const linkURL = el.getAttribute && el.getAttribute('href');
                    if (linkURL) {
                        e.preventDefault();
                        if (linkURL.charAt(0) === '#') this.scrollTo(linkURL.replace('#', ''));
                        else if (linkURL.includes('layers/')) this.openLayerDialog();
                        else if (linkURL.match(/(nav-app\/src\/)/g)) window.open(linkURL.replace(/(nav-app\/src\/)/g, ''));
                        else window.open(linkURL);
                    }
                }
            });
        }
    }

    public scrollTo(anchor) {
        let element = document.querySelector('.' + anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    /**
     * open the layer information dialog
     */
    public openLayerDialog(): void {
        this.dialog.open(LayerInformationComponent, {
            autoFocus: false,
            panelClass: this.data.theme,
        });
    }
}

interface MarkdownHeadingAnchor {
    level: number;
    anchor: string;
    label: string;
}
