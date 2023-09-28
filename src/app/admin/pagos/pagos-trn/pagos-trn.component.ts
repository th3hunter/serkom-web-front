import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Pagos } from 'src/app/common/models/pagos';
import { HttpService } from 'src/app/core/services/http.service';
import { SuscripcionesSelComponent } from '../../suscripciones/suscripciones-sel/suscripciones-sel.component';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { Usuarios } from 'src/app/common/models/usuarios';

@Component({
  selector: 'app-pagos-trn',
  templateUrl: './pagos-trn.component.html',
  styleUrls: ['./pagos-trn.component.scss']
})
export class PagosTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as Pagos;

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<PagosTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Pagos>('pagos/mostrar', [
                { name: 'pagoId', value: this.data.pagoId }
            ]).subscribe(res => {
                this.atributos = res.item;
                this.loading = false;
            }));
        } else {
            // Valores default
            this.atributos.estado = '1';
            this.atributos.fkSuscripcion = {} as Suscripciones;
            this.atributos.fkSuscripcion.fkUsuario = {} as Usuarios;
        }
    }

    buscarSuscripcion(): void {
            const dialogRef = this.dialog.open(SuscripcionesSelComponent, {
                width: '600px',
            });

            this.subscriptions.add(dialogRef.afterClosed()
                .subscribe((result: Suscripciones) => {
                    if (!result)
                        return;

                    this.atributos.fkSuscripcion = result;
                    this.atributos.suscripcionId = result.suscripcionId;
                }));
        }

    guardar(): void {
        // Si no está todo válido, no hago nada
        if (!this.form.valid) {
            this.toastr.error('Ingrese todos los campos obligatorios');
            return;
        }

        this.loadingGuardar = true;

        // Si es INSERT
        if (this.modo === 'ins') {
            this.subscriptions.add(this.httpService.create('pagos/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('pagos/actualizar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

    }

    cancelar(guardado?: boolean): void {
        this.loadingGuardar = false;
        this.dialogRef.close(guardado);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
