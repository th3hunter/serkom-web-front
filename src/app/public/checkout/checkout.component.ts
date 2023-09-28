import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Empresas } from 'src/app/common/models/empresas';
import { EmpresasPrd } from 'src/app/common/models/empresas-prd';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { Usuarios } from 'src/app/common/models/usuarios';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnDestroy {

    suscripcion: Suscripciones;
    empresa: Empresas;
    loading: boolean;

    @ViewChild(NgForm) form: NgForm;
    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                private toastr: ToastrService,
                private carrito: CarritoService,
                private router: Router,
                private confirm: ConfirmService) {

        this.suscripcion = {} as Suscripciones;
        this.suscripcion.fkUsuario = {} as Usuarios;
        this.empresa = {} as Empresas;
    }

    registrarse(): void {
        // Si no está todo válido, no hago nada
        if (!this.form.valid) {
            this.toastr.error('Ingrese todos los campos obligatorios');
            return;
        }

        // Validaciones
        if (this.suscripcion.fkUsuario.password != this.suscripcion.fkUsuario.confirmarPassword) {
            this.toastr.error('Las contraseñas no coinciden');
            return;
        }

        let linea = 1;

        // Arma el objeto Json
        this.empresa.fkProductos = this.carrito.items.map(p => {
            return {
                empresaId: 0,
                detalleId: linea++,
                productoId: p.productoId,
                precio: p.pvp
            } as EmpresasPrd;
        });
        this.suscripcion.fkEmpresas = [ this.empresa ];

        this.loading = true;

        this.subscriptions.add(this.httpService.create('suscripciones/registrarse', this.suscripcion)
            .subscribe(res => {
                this.loading = false;

                // Obtiene el guid y redirecciona
                const suscripcion = res.items.pop() as Suscripciones;
                this.router.navigate(['/confirmar-cuenta', suscripcion.uid]);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();

    }

}
