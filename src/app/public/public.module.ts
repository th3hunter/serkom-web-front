import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

// Material
import { MatIconModule } from '@angular/material/icon';

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
import { CorePublicModule } from '../core/core.public.module';

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
        CheckoutConfirmComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CorePublicModule,

        // Material
        MatIconModule
    ],
    exports: []
})
export class PublicModule { }
