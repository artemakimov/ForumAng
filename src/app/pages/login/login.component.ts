import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formValue: FormGroup;
  public isButtonSubmitted = false;
  public errorMessage: string = null;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formValue = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required]],
    });
  }

  public ThenButtonSubmitted() {
    const controls = this.formValue.controls;
    this.isButtonSubmitted = true;

    if (this.formValue.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAllAsTouched()
      );
    }

    this.authService
      .signIn(controls['email'].value, controls['password'].value)
      .then(() => {
        this.formValue.reset();
        this.router.navigate(['/home']);
      })
      .catch((e: Error) => {
        if (
          e.message ==
          'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth / user - not - found).'
        ) {
          this.errorMessage = 'There is no such user!';
        } else if (
          e.message ==
          'Firebase: The email address is badly formatted. (auth/invalid-email).'
        ) {
          this.errorMessage = 'The email address is badly formatted.';
        } else {
          this.errorMessage = 'Unknown error';
        }
      });

    this.formValue.reset();
  }

  public IsControlValid(controlName: string): boolean {
    const control = this.formValue.controls[controlName];

    return control.invalid && control.touched;
  }

  public controlAuth(
    provider: Promise<firebase.default.auth.UserCredential>
  ): void {
    const controls = this.formValue.controls;

    Object.keys(controls).forEach((name) => controls[name].markAsUntouched());

    provider.then((result: firebase.default.auth.UserCredential) => {
      this.router.navigate(['/home']);
    });
  }

  public facebookAuth(): void {
    this.controlAuth(this.authService.facebookAuth());
  }

  public githubAuth(): void {
    this.controlAuth(this.authService.githubAuth());
  }

  public googleAuth(): void {
    this.controlAuth(this.authService.googleAuth());
  }
}
