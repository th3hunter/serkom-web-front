import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { OverviewComponent } from './overview/overview.component';
import { UserComponent } from './user/user.component';
import { CompaniesComponent } from './companies/companies.component';
import { PaymentsComponent } from './payments/payments.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: { page: 'index' },
        children: [
            { path: '', component: OverviewComponent, data: { page: 'resumen' } },
            { path: 'usuario', component: UserComponent, data: { page: 'usuario' } },
            { path: 'pagos', component: PaymentsComponent, data: { page: 'pagos' } },
            { path: 'facturas', component: InvoicesComponent, data: { page: 'facturas' } },
        ]
    },
    { path: 'confirmar-pago', component: PaymentConfirmComponent, data: { page: 'confirmar-pago' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
