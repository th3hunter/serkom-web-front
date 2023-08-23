import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { PublicModule } from './public/public.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        PublicModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-center',
            closeButton: true,
            easeTime: 250
        }),
    ],
    providers: [provideClientHydration()],
    bootstrap: [AppComponent]
})
export class AppModule { }
