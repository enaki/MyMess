import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    InboxRoutingModule,
    FormsModule
  ]
})
export class InboxModule { }
