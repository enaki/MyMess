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
import {SnakbarService} from '../../shared/services/snakbar.service';
import {FormValidatorsService} from '../../shared/services/form-validators.service';


@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public loginFormGroup: FormGroup;
    public registerFormGroup: FormGroup;
    public genders: Array<string> = ['Male', 'Female'];
    private subs: Subscription[];
    public isSetRegistered = false;
    public countries: Array<CountryModel>;
    public countriesLoaded: Promise<boolean>;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService,
        private readonly socketService: SocketService,
        private readonly snackBar: MatSnackBar,
        private readonly snackBarService: SnakbarService,
        private readonly validatorsCustom: FormValidatorsService,
    ) {
        this.snackBarService.setSnackBar(this.snackBar);
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
                    Validators.minLength(3),
                    Validators.maxLength(150),
                ]
            ],
            passwordHash: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(60),
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
                    this.matchValidator.bind(this)
                ]
            ],
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(50)
                ]
            ],
            lastName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
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

    public handleError(responseError: HttpErrorResponse): void {
        if (responseError.status === 400) {
            if ('code' in responseError.error) {
                this.snackBarService.openSnackBar(responseError.error.error, 'Ok');
            } else {
                this.snackBarService.openSnackBar(responseError.statusText, 'Ok');
            }
        }
    }

    public matchValidator(control: AbstractControl): { [key: string]: boolean } | null {
        console.log('Validator user form' + this.registerFormGroup);
        const fromValue = control.value;
        if (this.registerFormGroup) {
            const toValue = (this.registerFormGroup.get('passwordHash') as FormGroup).value;
            if (fromValue && toValue && fromValue === toValue) {
                return null;
            }
            return { fieldMatch : true };
        }
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
        this.validatorsCustom.setUserProfileGroup(this.registerFormGroup);
        this.isSetRegistered = !this.isSetRegistered;
        if (!this.isSetRegistered){
            this.registerFormGroup.markAllAsTouched();
            this.registerFormGroup.setValue({
                username: '',
                passwordHash: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                birthdate: '',
                gender: '',
                country: '',
                city: '',
            });
            window.location.reload();
        }
    }

    public authenticate(): void {
        if (this.isSetRegistered) {
            if (!this.registerFormGroup.valid){
                this.snackBarService.openSnackBar('Invalid register data!', 'Ok');
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
                            this.snackBarService.openSnackBar('Successful register user, please log in!', 'Ok');
                            window.location.reload();
                        }
                    }, (err) => {this.handleError(err); })
            );
        } else {
            if (!this.loginFormGroup.valid){
                this.snackBarService.openSnackBar('Invalid login data!', 'Ok');
                return;
            }
            const data: LoginModel = this.loginFormGroup.getRawValue();
            this.subs.push(
                this.authenticationService
                    .login(data)
                    .subscribe((response: HttpResponse<any>) => {
                            console.log(response);
                            if (response.status === 200) {
                                this.userService.setToken(response.body.token);
                                sessionStorage.setItem('userToken', response.body.token);
                                sessionStorage.setItem('identity', JSON.stringify(response.body));
                                this.socketService.setupSocketConnection();
                                this.router.navigate(['home']).then(r => {});
                            }
                        }, (err) => {this.handleError(err); }
                    )
            );
        }
    }

    public isInvalid(form: AbstractControl): boolean {
        return form.invalid && form.touched && form.dirty;
    }

}

