/**
 * This directive is used as an anchor to get access
 * to the ViewContainerRef which here is exposed via
 * the public member `viewContainer`
 *
 * Theres an ALTERNATIVE to explicitly using the anchor directive.
 * Read in the blog post
 */

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-tabs]'
})
export class DynamicTabsDirective {
  constructor(public viewContainer: ViewContainerRef){}
}
