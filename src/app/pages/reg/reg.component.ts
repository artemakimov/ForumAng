import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public formValue: FormGroup;
  public isButtonSubmitted = false;
  public isUserLoggedIn = false;
  public errorMessage: string = null;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public ThenActive() {
    const controls = this.formValue.controls;
    this.isButtonSubmitted = true;

    if (this.formValue.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAllAsTouched()
      );
    }

    this.authService
      .signUp(controls['email'].value, controls['password'].value)
      .then(() => {
        this.formValue.reset();
        this.router.navigate(['home']);
      })
      .catch((e: Error) => {
        if (
          e.message ==
          'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
        ) {
          this.errorMessage =
            'The email address is already in use by another account';
        } else if (
          e.message ==
          'Firebase: The email address is badly formatted. (auth/invalid-email).'
        ) {
          this.errorMessage = 'The email address is badly formatted.';
        } else {
          this.errorMessage = 'Unknown error';
        }
      });
  }

  private initForm() {
    this.formValue = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  public IsControlValid(name: string): boolean {
    const control = this.formValue.controls[name];

    return control.invalid && control.touched;
  }

  public controlAuth(
    provider: Promise<firebase.default.auth.UserCredential>
  ): void {
    const controls = this.formValue.controls;

    Object.keys(controls).forEach((value) => controls[value].markAsUntouched());

    provider.then((result: firebase.default.auth.UserCredential) => {
      this.router.navigate(['home']);
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
