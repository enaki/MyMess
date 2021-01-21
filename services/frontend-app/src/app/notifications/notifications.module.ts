import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [NotificationsComponent],
    imports: [
        CommonModule,
        NotificationsRoutingModule,
        MatCardModule,
        SharedModule
    ]
})
export class NotificationsModule { }
