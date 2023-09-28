import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { Credentials } from 'src/app/core/interfaces/Credentials';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnDestroy {

    codigoConfirmacion: number;
    loading: boolean;
    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                private toastr: ToastrService,
                private router: Router,
                public  route: ActivatedRoute,
                private loginService: LoginService) {}

    confirmar(): void {
        this.loading = true;

        this.subscriptions.add(this.httpService.post<Credentials>('suscripciones/confirmar', [
            { name: 'codigoConfirmacion', value: this.codigoConfirmacion },
            { name: 'uid', value: this.route.snapshot.paramMap.get('uid') },
        ]).subscribe(res => {
                this.loading = false;

                if (res.code == 200) {
                    // Hace Login
                    this.loginService.login(res.item);

                    // Redirecciona
                    this.router.navigate(['/mi-cuenta/confirmar-pago']);
                }
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
