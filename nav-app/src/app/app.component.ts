import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TabsComponent } from './tabs/tabs.component';
import { ConfigService } from './config.service';
import * as globals from "./globals";
import { IconsService } from "./icons.service";
import { deleteCookie, getCookie, hasCookie, setCookie } from "./cookies";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(TabsComponent) tabsComponent;

  nav_version: string = globals.nav_version;
  public user_theme: string;
  title = 'ATT&CK® Navigator';

  @HostListener('window:beforeunload', ['$event'])
  promptNavAway($event) {
    if (!this.configService.getFeature('leave_site_dialog')) return;
    //this text only shows in the data, not visible to user as far as I can tell
    //however, if it's not included the window doesn't open.
    $event.returnValue = 'Are you sure you want to navigate away? Your data may be lost!';
  }

  constructor(public configService: ConfigService, private iconsService: IconsService, private titleService:Title) {
    Array.prototype.includes = function (value): boolean {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === value) return true
      }
      return false;
    }
    if (hasCookie("is_user_theme_dark") && getCookie("is_user_theme_dark") === "true") {
      this.user_theme = 'theme-override-dark';
    } else if (getCookie("is_user_theme_dark") === "false") {
      this.user_theme = 'theme-override-light';
    }  else {
      this.user_theme = 'theme-use-system';
    }
  }

  ngOnInit() {
    this.iconsService.registerIcons();
    this.titleService.setTitle(this.title);
  }

  themeChangeHandler(theme: string) {
    if (theme === 'system') {
      if (hasCookie("is_user_theme_dark")) deleteCookie("is_user_theme_dark");
      this.user_theme = 'theme-use-system';
    }
    else {
      this.user_theme = (theme === 'dark') ? 'theme-override-dark' : 'theme-override-light';
      setCookie("is_user_theme_dark", (theme === 'dark') ? "true" : "false", 180);
    }
  }
}
