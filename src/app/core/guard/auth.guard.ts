import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardModule implements CanActivate {
  constructor(public router: Router, public authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authGuardPipe.pipe(
      map((user) => {
        if (user) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
