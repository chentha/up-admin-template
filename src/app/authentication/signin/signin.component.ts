//updated
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Key } from 'angular-feather/icons';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  hide = true;

  isLoading = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();

  }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    //disable and enable form
    this.loginForm.disable();
    this.loginForm.enable();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.isLoading = true
    this.loginForm.disable();
    if (this.loginForm.valid) {
      console.log('hi')
      this.authService.login(this.form['username'].value, this.form['password'].value)
        .subscribe(
          (res: any) => {
            if (res) {
              // const token = this.authService.currentUserValue.token;
              // if (token) {
              //   this.router.navigate(['/dashboard/main']);
              // }
              if(res.key){
                localStorage.setItem('sid',res.key)
                console.log('success')
                this.router.navigate(['/dashboard/main']);
              }
         
            } else {
              this.error = 'Invalid Login';
            }
            this.isLoading = false
          },
          (error) => {
            this.isLoading = false
            this.error = error;
            this.submitted = false;
          }
        );
    } else{
      this.isLoading = false
    }


  }
}
