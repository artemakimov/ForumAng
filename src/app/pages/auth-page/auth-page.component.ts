import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthModuleService } from 'src/app/core/service/login.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})

export class AuthComponent implements OnInit {
  public registrationFormValues: FormGroup;
  public IsButtonSubmitted = false;
  public IsUserLoggedIn = false;
  public errorMessage: string | null = null;

  constructor(
    public AuthModuleService: AuthModuleService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public ThenActive() {
    const controls = this.registrationFormValues.controls;
    this.IsButtonSubmitted = true;

    if (this.registrationFormValues.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAllAsTouched()
      );
    }

    this.AuthModuleService
      .signUp(controls['email'].value, controls['password'].value)
      .then((result: Promise<any>) => {
        this.registrationFormValues.reset();
        this.router.navigate(['home']);
      })
      .catch((e: Error) => {
        if(e.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
          this.errorMessage =
          'The email address is already in use by another account';
        }else if(e.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).'){
          this.errorMessage =
          'The email address is badly formatted.';
        }else{
          this.errorMessage = 'Unknown error';
        }
      });
  }

  private initForm() {
    this.registrationFormValues = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required,
          Validators.email
        ]
      ],

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

  IsItRight(controlName: string): boolean {
    const controlOfEntered = this.registrationFormValues.controls[controlName];
    return controlOfEntered.touched && controlOfEntered.invalid;
  }
}
