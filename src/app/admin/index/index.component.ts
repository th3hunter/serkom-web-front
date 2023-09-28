import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { subRouterAnimation } from 'src/app/core/animations/SubRouterAnimations';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-account-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ subRouterAnimation ]
})
export class IndexComponent implements OnInit, OnDestroy {

    suscripcion: Suscripciones;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private loginService: LoginService,
                private router: Router) {}

    ngOnInit(): void { }

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
