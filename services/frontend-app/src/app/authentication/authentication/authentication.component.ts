import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RegisterModel} from '../models/register.model';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {
    this.subs = new Array<Subscription>();
    this.formGroup = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60)
        ]
      ],
      email: [
        '',
        [
            Validators.required,
            Validators.email,
            Validators.maxLength(100)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60)
        ]
      ],
      firstname: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      birthdate: [
        '',
        [
          Validators.required
        ]
      ],
      gender: [
        '',
        [
          Validators.required
        ]
      ],
      country: [
        '',
        [
          Validators.required
        ]
      ],
      city: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }
  public formGroup: FormGroup;
  private subs: Subscription[];
  public isSetRegistered = false;

  private static handleError(responseError: HttpErrorResponse): void {
    cleanErrorList();
    if (responseError.status === 400) {
      console.log(responseError);
      if ('code' in responseError.error) {
        const newError = document.createElement('div');
        newError.className = 'error-item';
        newError.innerHTML = responseError.error.error;
        document.getElementById('error-list').appendChild(newError);
      } else {
        const newError = document.createElement('div');
        newError.className = 'error-item';
        newError.innerHTML = responseError.statusText;
        document.getElementById('error-list').appendChild(newError);
      }
    }
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  ngOnDestroy(): void {
    this.subs.forEach( (sub) => {
      sub.unsubscribe();
    });
  }

  public setRegister(): void {
    this.isSetRegistered = !this.isSetRegistered;
    cleanErrorList();
    if (!this.isSetRegistered){
      this.formGroup.markAllAsTouched();
      this.formGroup.setValue({
        username: '',
        passwordHash: '',
        email: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        gender: '',
        country: '',
        city: '',
      });
    }
  }

  public authenticate(): void {
    if (this.isSetRegistered) {
      const data: RegisterModel = this.formGroup.value;
      console.log(data);
      this.subs.push(
          this.authenticationService
              .register(data)
              .subscribe((data: HttpResponse<any>) => {
                if (data.status === 201) {
                  this.setRegister();
                  document.getElementById('successful-register').innerHTML =
                      'Successful register user, please log in!';
                }
              }, AuthenticationComponent.handleError)
      );
    } else {
      let data: LoginModel = this.formGroup.getRawValue();
      for ( const propName in data){
        if (data[propName] === ''){
          delete data[propName];
        }
      }
      this.subs.push(
          this.authenticationService
              .login(data)
              .subscribe((data: HttpResponse<any>) => {
                if (data.status === 200) {
                  sessionStorage.setItem('userToken', data.body.token);
                  sessionStorage.setItem('identity', JSON.stringify(data.body));
                  this.router.navigate(['inbox']);
                }
              }, AuthenticationComponent.handleError
              )
      );
    }
  }

  public isInvalid(form: AbstractControl): boolean {
    return form.invalid && form.touched && form.dirty;
  }
}

function cleanErrorList(): void {
  const tmp = document.getElementById('error-list');
  if (tmp !== undefined)
  {
    const errorList = document.getElementById('error-list').childNodes;
    errorList.forEach((child) => {
      document.getElementById('error-list').removeChild(child);
    });
  }
}
