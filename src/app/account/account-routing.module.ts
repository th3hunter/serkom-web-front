import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';

const routes: Routes = [
    { path: '', component: IndexComponent, data: { page: 'index' } },
    { path: 'confirmar-pago', component: PaymentConfirmComponent, data: { page: 'confirmar-pago' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
