import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {RegisterModel} from '../models/register.model';
import {LoginModel} from '../models/login.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../../shared/services';
import {SocketService} from '../../shared/services/socket.service';
import {CountryModel} from '../models/country.model';


@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
    ) {
        this.subs = new Array<Subscription>();
        this.countries = new Array<CountryModel>();
        this.subs.push(
            this.authenticationService.getCountriesAndCities().subscribe(
                (response: HttpResponse<any>) => {
                    if (response.status === 200){
                        this.countries = response.body.data;
                        this.countriesLoaded = Promise.resolve(true);
                    }
                }
            )
        );
        this.loginFormGroup = this.formBuilder.group({
            username: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(150),
                    Validators.minLength(3)
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(60)
                ]
            ]
        });
        this.registerFormGroup = this.formBuilder.group({
            username: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(150),
                    Validators.minLength(3)
                ]
            ],
            passwordHash: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(60),
                    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
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
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(50)
                ]
            ],
            lastName: [
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
    public loginFormGroup: FormGroup;
    public registerFormGroup: FormGroup;
    public genders: Array<string> = ['Male', 'Female'];
    private subs: Subscription[];
    public isSetRegistered = false;
    public countries: Array<CountryModel>;
    public countriesLoaded: Promise<boolean>;
    public selectedCountry: string;


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

    public correspondingPasswords(): boolean{
        return this.registerFormGroup.get('passwordHash') === this.registerFormGroup.get('confirmPassword');
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
            this.registerFormGroup.markAllAsTouched();
            this.registerFormGroup.setValue({
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
        console.log(this.selectedCountry);
        if (this.isSetRegistered) {
            const data: RegisterModel = this.registerFormGroup.getRawValue();
            delete data.confirmPassword;
            this.subs.push(
                this.authenticationService
                    .register(data)
                    .subscribe((response: HttpResponse<any>) => {
                        if (response.status === 201) {
                            this.setRegister();
                            document.getElementById('successful-register').innerHTML =
                                'Successful register user, please log in!';
                        }
                    }, AuthenticationComponent.handleError)
            );
        } else {
            const data: LoginModel = this.loginFormGroup.getRawValue();
            this.subs.push(
                this.authenticationService
                    .login(data)
                    .subscribe((response: HttpResponse<any>) => {
                            if (response.status === 200) {
                                this.userService.setToken(response.body.token);
                                sessionStorage.setItem('userToken', response.body.token);
                                sessionStorage.setItem('identity', JSON.stringify(response.body));
                                this.router.navigate(['inbox']).then( () => {});
                            }
                        }, AuthenticationComponent.handleError
                    )
            );
        }
      }
      this.subs.push(
          this.authenticationService
              .login(data)
              .subscribe((data: HttpResponse<any>) => {
                if (data.status === 200) {
                  this.userService.setToken(data.body.token);
                  sessionStorage.setItem('userToken', data.body.token);
                  sessionStorage.setItem('identity', JSON.stringify(data.body));
                  this.socketService.setupSocketConnection();
                  this.router.navigate(['inbox']);
                }
              }, AuthenticationComponent.handleError
              )
      );
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
