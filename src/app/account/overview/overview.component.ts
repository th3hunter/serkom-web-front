import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { HttpService } from 'src/app/core/services/http.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    loading: boolean;
    loadingInfo: boolean;
    loadingEmpresas: boolean;
    proximoValorPagar: number;
    suscripcion = {} as Suscripciones;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private dialog: MatDialog,
                private toastr: ToastrService,
                private confirm: ConfirmService) {}

    ngOnInit(): void {
        this.cargarSuscripcion();
    }

    cargarSuscripcion(hideLoading?: boolean): void {
        if (!hideLoading)
            this.loading = true;

        this.subscriptions.add(this.httpService.read<Suscripciones>('suscripciones/datos')
            .subscribe(res => {
                if (!hideLoading)
                    this.loading = false;

                this.suscripcion = res.item;
            }
        ));
    }

    modificarMetodoPago(): void {

    }

    cancelarSuscripcion(): void {
        this.subscriptions.add(
            this.confirm.open('¿Está seguro de cancelar su suscripción?\nToda su información puede perderse\nEsta operación no se puede revertir.')
                .subscribe(response => {
                    if (!response)
                        return;


                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
