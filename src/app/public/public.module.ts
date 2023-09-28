import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

// Modules
import { CorePublicModule } from '../core/core.public.module';

// Components
import { IndexComponent } from './index/index.component';
import { FeaturesComponent } from './features/features.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { ModulesComponent } from './modules/modules.component';
import { PlansComponent } from './plans/plans.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component'
import { CheckoutConfirmComponent } from './checkout-confirm/checkout-confirm.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
    declarations: [
        IndexComponent,
        FeaturesComponent,
        AdvertiseComponent,
        ModulesComponent,
        PlansComponent,
        AboutComponent,
        ContactComponent,
        CarrouselComponent,
        LoginComponent,
        CheckoutComponent,
        CheckoutConfirmComponent,
        UnauthorizedComponent,
        NotFoundComponent,
        RestorePasswordComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CorePublicModule,
    ],
    exports: []
})
export class PublicModule { }
