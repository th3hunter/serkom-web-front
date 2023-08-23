import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { IndexComponent } from './index/index.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

@NgModule({
    declarations: [
        IndexComponent,
        PaymentConfirmComponent
    ],
    imports: [
        CommonModule,
        AccountRoutingModule
    ]
})
export class AccountModule { }
