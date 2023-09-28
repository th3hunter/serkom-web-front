import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadoSuscripcion } from 'src/app/common/enums';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { routerAnimation } from 'src/app/core/animations/RouterAnimations';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-account-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ routerAnimation ]
})
export class IndexComponent implements OnInit, OnDestroy {

    suscripcion: Suscripciones;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private loginService: LoginService,
                private router: Router) {}

    ngOnInit(): void {
        // Verifica el estado de la cuenta
        this.subscriptions.add(this.httpService.read<Suscripciones>('suscripciones/datos')
            .subscribe(res => {
                this.suscripcion = res.item;

                if (this.suscripcion.estado == EstadoSuscripcion.POR_CONFIRMAR_PAGO)
                    this.router.navigate(['/mi-cuenta/confirmar-pago']);
            }
        ));
    }

    prepareRoute(o: RouterOutlet): any {
        return o && o.activatedRouteData;
    }

    logout(): void {
        // Verifica el estado de la cuenta
        this.subscriptions.add(this.httpService.read<boolean>('sesion/logout')
            .subscribe(res => {
                this.loginService.logout();
                this.router.navigate(['/']);
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
