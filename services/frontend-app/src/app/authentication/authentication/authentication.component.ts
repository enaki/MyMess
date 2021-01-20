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
import {MatSnackBar} from '@angular/material/snack-bar';


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
        private readonly userService: UserService,
        private readonly socketService: SocketService,
        private readonly snackBar: MatSnackBar
    ) {
        this.subs = new Array<Subscription>();
        this.countries = new Array<CountryModel>();
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


    private handleError(responseError: HttpErrorResponse): void {
        if (responseError.status === 400) {
            if ('code' in responseError.error) {
                this.openSnackBar(responseError.error.error, 'Ok');
            } else {
                this.openSnackBar(responseError.statusText, 'Ok');
            }
        }
    }

    private openSnackBar(message: string, action: string): void{
        this.snackBar.open(message, action, {duration: 2000});
    }

    public correspondingPasswords(): boolean{
        return this.registerFormGroup.get('passwordHash') === this.registerFormGroup.get('confirmPassword');
    }

    ngOnInit(): void {
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
        sessionStorage.clear();
    }

    ngOnDestroy(): void {
        this.subs.forEach( (sub) => {
            sub.unsubscribe();
        });
    }

    public setRegister(): void {
        this.isSetRegistered = !this.isSetRegistered;
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
        if (this.isSetRegistered) {
            if (!this.registerFormGroup.valid){
                this.openSnackBar('Invalid register data!', 'Ok');
                return;
            }
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
                    }, this.handleError)
            );
        } else {
            if (!this.loginFormGroup.valid){
                this.openSnackBar('Invalid login data!', 'Ok');
                return;
            }
            const data: LoginModel = this.loginFormGroup.getRawValue();
            this.subs.push(
                this.authenticationService
                    .login(data)
                    .subscribe((response: HttpResponse<any>) => {
                            if (response.status === 200) {
                                this.userService.setToken(response.body.token);
                                sessionStorage.setItem('userToken', response.body.token);
                                sessionStorage.setItem('identity', JSON.stringify(response.body));
                                this.socketService.setupSocketConnection();
                                this.router.navigate(['inbox']);
                            }
                        }, this.handleError
                    )
            );
        }
    }

    public isInvalid(form: AbstractControl): boolean {
        return form.invalid && form.touched && form.dirty;
    }

}

