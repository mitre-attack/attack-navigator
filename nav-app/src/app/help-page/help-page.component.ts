import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpPageComponent implements OnInit {
  @ViewChild('markdownElement', {static: false}) private markdownElement: MarkdownComponent;

  // To replicate anchor-link behavior, HostListener listens for clicks on page, then:
  // 1) checks if the element is a list or span element,
  //      if it is a span element where the displayed span text and anchor link are not matching, then
  //      the span element is provided with a 'linkName-' reference to the anchor link
  // 2) parses string into element ID string format (i.e. lower_case)
  // 3) if <ul>, takes only the first text element before a \n line break
  // 4) passes string to scrollTo()
  @HostListener('click', ['$event.target']) onClick(target) {
    if (!target || !target.innerText) return;
    let elementName = '';
    if (target.outerHTML.includes('li') || target.outerHTML.includes('span')) {
      if (target.className.includes('section-link')) elementName = target.className.split('linkName-')[1].toLowerCase();
      else elementName = target.innerText.toLowerCase().replaceAll(/ /g, '_').split('\n')[0];
    }
    this.scrollTo(elementName);
  }


  constructor() {}

  ngOnInit(): void {}

  scrollTo(sectionID: string): void {
    let element = document.getElementsByClassName(sectionID)[0];
    if (element) element.scrollIntoView();
  }

}
