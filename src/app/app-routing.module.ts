import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './public/index/index.component';
import { LoginComponent } from './public/login/login.component';
import { CheckoutComponent } from './public/checkout/checkout.component';
import { CheckoutConfirmComponent } from './public/checkout-confirm/checkout-confirm.component';

const routes: Routes = [
    // { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: '', component: IndexComponent, data: { page: 'index' } },
    { path: 'login', component: LoginComponent, data: { page: 'login' } },
    { path: 'registrese', component: CheckoutComponent, data: { page: 'registrese' } },
    { path: 'confirmar-cuenta/:uid', component: CheckoutConfirmComponent, data: { page: 'confirmar-cuenta' } },
    {
        path: 'mi-cuenta',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        // canActivateChild: [ AccessChildGuard ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
