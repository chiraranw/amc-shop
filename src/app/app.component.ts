import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'amc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  public loading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgSvc: MessageService
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkoutRouterEvents(routerEvent);
    });
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.msgSvc.isDisplayed = true;
  }

  hideMessages(): void {
    this.msgSvc.isDisplayed = false;
    this.router.navigate([{ outlets: { popup: null } }]);
  }

  private checkoutRouterEvents(routerEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed() {
    return this.msgSvc.isDisplayed;
  }
  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/welcome']);
    console.log('Log out');
  }
}
