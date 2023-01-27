import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private destroy = new Subject<boolean>();
  constructor(
    private authService:AuthService,
    private router: Router
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getAuthState().pipe(map(
        user =>{
          if(user){
            this.router.navigate(['/home'])
            return false;
          }
          return true;
        }

      ), takeUntil(this.destroy))


  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
