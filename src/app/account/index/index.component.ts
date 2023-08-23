import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-account-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    suscripcion: Suscripciones;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService) {}

    ngOnInit(): void {
        // Verifica el estado de la cuenta
        this.subscriptions.add(this.httpService.read<Suscripciones>('suscripciones/datos')
            .subscribe(res => {
                this.suscripcion = res.item;
            }
        ));
    }

}
