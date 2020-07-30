import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  CanLoad,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn(state.url);
  }

  // Use the segments to build the full route
  // when using canLoad
  canLoad(route: Route): boolean {
    return this.isLoggedIn(route.path);
  }

  private isLoggedIn(url: string): boolean {
    if (this.authSvc.currentUser) {
      return true;
    }
    this.authSvc.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
