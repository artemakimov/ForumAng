import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators'

@Injectable()
export class HomeGuard implements CanActivate {
  private destroy = new Subject<boolean>();
  
  constructor(private router: Router, private afAuth: AngularFireAuth) { }
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user)=>{
      if(user) {
        return true;
      }
      this.router.navigate(['/login'])
      return false;
    }), takeUntil(this.destroy))
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }
}