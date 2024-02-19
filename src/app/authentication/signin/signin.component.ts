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
// import { AES } from 'crypto-js';
import * as cryptojs from 'crypto-js';
  

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';

  password!: string;
  show = false;

  isLoading = false;
  rememberMeChecked = false;

  encryptionKey = 'yourEncryptionKey'; // Replace with your encryption key

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
      rememberMe: ['']
    });

    this.password = 'password';

    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe) {
      this.rememberMeChecked = true;
      const encryptedUsername = localStorage.getItem('username');
      const encryptedPassword = localStorage.getItem('password');
      if (encryptedUsername && encryptedPassword) {
        const username = this.decryptData(encryptedUsername);
        const password = this.decryptData(encryptedPassword);   
        console.log('a',this.decryptData(encryptedUsername))
        console.log(this.decryptData(encryptedUsername))
        this.loginForm.patchValue({ username, password });
      }
    }

    this.loginForm.disable();
    this.loginForm.enable();
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  hide() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.authService.login(this.form['username'].value, this.form['password'].value)
        .subscribe(
          (res: any) => {
            if (res && res.key) {
              localStorage.setItem('sid', res.key);
              console.log('success');
              this.router.navigate(['/dashboard/main']);
            } else {
              this.error = 'Invalid Login';
            }
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            this.error = error;
            this.submitted = false;
          }
        );

      this.rememberMeChecked = this.loginForm.get('rememberMe')?.value;
      if (this.rememberMeChecked) {
        const encryptedUsername = this.encryptData(this.loginForm.value.username);
        const encryptedPassword = this.encryptData(this.loginForm.value.password);

        localStorage.setItem('username', encryptedUsername);
        localStorage.setItem('password', encryptedPassword);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
    } else {
      this.isLoading = false;
    }
  }

  encryptData(data: string): string {
    return cryptojs.AES.encrypt(data, this.encryptionKey).toString();
  }

  decryptData(encryptedData: string): string {
    return cryptojs.AES.decrypt(encryptedData, this.encryptionKey).toString(cryptojs.enc.Utf8);
  }

}
