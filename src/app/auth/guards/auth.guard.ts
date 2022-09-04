import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  private token: string | null = null;
  private userId: string | null = null;
  private condition: boolean = false;
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this.token = JSON.parse(token);
      this.userId = JSON.parse(userId);
    }
    if (this.token && this.userId) {
      this.condition = true;
    } else {
      this._router.navigate(['auth']);
    }
    // console.log({ condition: this.condition });
    return this.condition;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this.token = JSON.parse(token);
      this.userId = JSON.parse(userId);
    }
    if (this.token && this.userId) {
      this.condition = true;
    } else {
      this._router.navigate(['auth']);
    }
    // console.log({ condition: this.condition });
    return this.condition;
  }
}
