import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './public/index/index.component';
import { LoginComponent } from './public/login/login.component';
import { CheckoutComponent } from './public/checkout/checkout.component';
import { CheckoutConfirmComponent } from './public/checkout-confirm/checkout-confirm.component';
import { UnauthorizedComponent } from './public/unauthorized/unauthorized.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { RestorePasswordComponent } from './public/restore-password/restore-password.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { AccessChildGuard } from './core/guards/access-child.guard';

const routes: Routes = [
    { path: '', component: IndexComponent, data: { page: 'index' } },
    { path: 'login', component: LoginComponent, data: { page: 'login' } },
    { path: 'registrese', component: CheckoutComponent, data: { page: 'registrese' } },
    { path: 'olvide-mi-contrasena', component: ForgotPasswordComponent, data: { page: 'olvide-mi-contrasena' } },
    { path: 'restaurar-contrasena/:uid', component: RestorePasswordComponent, data: { page: 'restaurar-contrasena' } },
    { path: '401', component: UnauthorizedComponent, data: { page: '401' } },
    { path: '404', component: NotFoundComponent, data: { page: '404' } },
    { path: 'confirmar-cuenta/:uid', component: CheckoutConfirmComponent, data: { page: 'confirmar-cuenta' } },
    {
        path: 'mi-cuenta',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        // canActivateChild: [ AccessChildGuard ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivateChild: [ AccessChildGuard ]
    },
    { path: '**', component: NotFoundComponent, data: { page: '404' } },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        initialNavigation: 'enabledBlocking',
        anchorScrolling: 'enabled',
        // enableTracing: true,
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
