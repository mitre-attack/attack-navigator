import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})

export class IconsService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
  }

  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), 'assets/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}

export enum Icons {
  SORT_ALPHABETICAL_ASC = 'ic_sort_alphabetically_ascending',
  SORT_ALPHABETICAL_DESC = 'ic_sort_alphabetically_descending',
  SORT_NUMERICAL_ASC = 'ic_sort_numerically_ascending',
  SORT_NUMERICAL_DESC = 'ic_sort_numerically_descending',
  UNFOLD_MORE_ALT = 'ic_unfold_more_alt'
}
