import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmarPagoContainer } from 'src/app/common/containers/payment-confirm-container';
import { Productos } from 'src/app/common/models/productos';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.scss']
})
export class PaymentConfirmComponent implements OnInit, OnDestroy {

    suscripcion: Suscripciones;
    productos: Productos[];
    total: number;

    loading: boolean;
    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private toastr: ToastrService,
                private router: Router) {}

    ngOnInit(): void {
        this.loading = true;

        this.subscriptions.add(this.httpService.list<ConfirmarPagoContainer>('suscripciones/inicializar-confirmar-pago')
            .subscribe(res => {
                this.loading = false;
                this.suscripcion = res.item.suscripcion;
                this.productos = res.item.planes;

                // Recorre los planes
                for (const producto of this.productos) {
                    // Si está en la lista de productos de la suscripción, lo marco
                    if (this.suscripcion.fkEmpresas.at(0).fkProductos.find(p => p.productoId == producto.productoId))
                        producto.seleccionado = true;
                }

                this.totalizar();
            }
        ));
    }

    seleccionarProducto(producto: Productos): void {
        producto.seleccionado = !producto.seleccionado;
        this.totalizar();
    }

    totalizar(): void {
        this.total = 0;

        for (const producto of this.productos.filter(p => p.seleccionado)) {
           this.total += producto.pvp;
        }
    }

    pagar(): void {
        if (this.total == 0) {
            this.toastr.error('No ha seleccionado ningún módulo');
            return;
        }

        this.subscriptions.add(this.httpService.post('suscripciones/confirmar-pago', [
            { name: 'datosTarjeta', value: 'blablabla' }
        ]).subscribe(res => {
            this.router.navigate(['/mi-cuenta/'])
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
