import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public currentUserEmail: string;
  private destroy = new Subject<boolean>();

  constructor(private authServise: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authServise
      .getAuthState()
      .pipe(takeUntil(this.destroy))
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        if (user) {
          this.currentUserEmail = user.email;
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.complete();
  }

  logout() {
    this.authServise.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
