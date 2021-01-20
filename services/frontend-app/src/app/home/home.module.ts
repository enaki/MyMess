import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SharedModule} from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
      HomeComponent,
      UpdateProfileComponent
  ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HomeRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        MatSnackBarModule
    ]
})
export class HomeModule { }
