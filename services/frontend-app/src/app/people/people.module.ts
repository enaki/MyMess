import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PeopleRoutingModule} from './people-routing.module';
import {PeopleComponent} from './people/people.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [PeopleComponent],
    imports: [
        CommonModule,
        PeopleRoutingModule,
        MatCardModule,
        FormsModule,
        SharedModule,
    ]
})
export class PeopleModule {
}
