import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from './shared/shared.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {AuthorizationInterceptor} from './interceptor/autorization.interceptor';
import {AuthGuard} from './guards/auth.guard';
import {JwtModule} from '@auth0/angular-jwt';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => sessionStorage.getItem('userToken'),
                allowedDomains: [],
                disallowedRoutes: [],
            },
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true,
        },
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
