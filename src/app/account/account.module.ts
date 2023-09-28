import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { CorePublicModule } from '../core/core.public.module';
import { CoreModule } from '../core/core.module';

import { IndexComponent } from './index/index.component';
import { OverviewComponent } from './overview/overview.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { UserComponent } from './user/user.component';
import { CompaniesComponent } from './companies/companies.component';
import { PaymentsComponent } from './payments/payments.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { AddModulesComponent } from './add-modules/add-modules.component';
import { CompanyInfoComponent } from './company-info/company-info.component';

@NgModule({
    declarations: [
        IndexComponent,
        PaymentConfirmComponent,
        OverviewComponent,
        UserComponent,
        CompaniesComponent,
        PaymentsComponent,
        InvoicesComponent,
        AddModulesComponent,
        CompanyInfoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AccountRoutingModule,
        CorePublicModule,
        CoreModule
    ]
})
export class AccountModule { }
