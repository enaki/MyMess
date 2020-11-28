import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(150)]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(60)
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
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      birthdate: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
