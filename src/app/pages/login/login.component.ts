import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModuleService } from 'src/app/core/service/login.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  
export class LoginComponent  implements OnInit {
  public IsButtonSubmitted = false;
  public errorMessage: string | null;
  public  registrationFormValues: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public AuthModuleService: AuthModuleService,
    public afAuth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(): void {
      this.initForm();
  }

  private initForm() {
      this.registrationFormValues = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
        
      password: ['', [
        Validators.required,
      ]]
    })
  }

  ThenActive() {
    const controls = this.registrationFormValues.controls;
    this.IsButtonSubmitted = true;

    if (this.registrationFormValues.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAllAsTouched());
    }

    this.AuthModuleService.signIn(controls['email'].value, controls['password'].value)
      .then((result: Promise<any>) => { 
        this.registrationFormValues.reset();
        this.router.navigate(['home']);
      })
      .catch((error: Error) => {
        switch (error.message) {
          case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
            this.errorMessage = 'Incorrect password and/or email!';
            break;
          case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
            this.errorMessage = 'There is no such user!';
            break;
          default:
            this.errorMessage = 'An unknown error occurred';
            break;
        }
      })

    this.registrationFormValues.reset();
  }

  IsItRight(controlName: string): boolean {
    const control = this.registrationFormValues.controls[controlName];
    
    return control.invalid && control.touched;
  }


}
