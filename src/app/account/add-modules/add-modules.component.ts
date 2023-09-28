import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfirmarPagoContainer } from 'src/app/common/containers/payment-confirm-container';
import { Empresas } from 'src/app/common/models/empresas';
import { EmpresasPrd } from 'src/app/common/models/empresas-prd';
import { Productos } from 'src/app/common/models/productos';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-add-modules',
  templateUrl: './add-modules.component.html',
  styleUrls: ['./add-modules.component.scss']
})
export class AddModulesComponent implements OnInit, OnDestroy{

    productos: Productos[];
    total: number;

    loading: boolean;
    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<AddModulesComponent>,
                private toastr: ToastrService,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        this.loading = true;

        this.subscriptions.add(this.httpService.list<ConfirmarPagoContainer>('suscripciones/inicializar-confirmar-pago')
            .subscribe(res => {
                this.loading = false;
                const modulosActuales = res.item.suscripcion.fkEmpresas.find(p => p.empresaId == this.data.empresaId).fkProductos;
                this.productos = res.item.planes;

                // Recorre los planes
                for (const producto of this.productos) {
                    // Si está en la lista de productos de la suscripción, lo marco
                    if (modulosActuales.find(p => p.productoId == producto.productoId)) {
                        producto.seleccionado = true;
                    }
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

    guardar(): void {
        // Si no hay nada escogido, no permito
        if (this.productos.filter(p => p.seleccionado).length == 0) {
            this.toastr.error('Debe seleccionar al menos 1 módulo');
            return;
        }

        // Arma el objeto
        var modulosSeleccionados: EmpresasPrd[] = this.productos
            .filter(p => p.seleccionado)
            .map(p => {
                const productos = {
                    empresaId: this.data.empresaId,
                    productoId: p.productoId
                } as EmpresasPrd;
                return productos;
            });

        this.subscriptions.add(this.httpService
            .create<number>('empresas/agregar-modulos', modulosSeleccionados)
            .subscribe(res => {
                this.dialogRef.close(res.item);
            }
        ));
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
