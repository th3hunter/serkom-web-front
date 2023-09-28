import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EstadoSuscripcion } from 'src/app/common/enums';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { Usuarios } from 'src/app/common/models/usuarios';
import { HttpService } from 'src/app/core/services/http.service';
import { UsuariosSelComponent } from '../../usuarios/usuarios-sel/usuarios-sel.component';
import { EnumHelper } from 'src/app/common/helpers/enums';

@Component({
  selector: 'app-suscripciones-trn',
  templateUrl: './suscripciones-trn.component.html',
  styleUrls: ['./suscripciones-trn.component.scss']
})
export class SuscripcionesTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as Suscripciones;
    estadosSuscripcion = [];

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<SuscripcionesTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;
        this.estadosSuscripcion = EnumHelper.toList(EstadoSuscripcion);
        this.atributos.fkUsuario = {} as Usuarios;

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Suscripciones>('suscripciones/mostrar', [
                { name: 'suscripcionId', value: this.data.suscripcionId }
            ]).subscribe(res => {
                this.atributos = res.item;
                this.loading = false;
            }));
        } else {
            // Valores default
            this.atributos.estado = EstadoSuscripcion.VIGENTE;
        }
    }

    buscarUsuario(): void {
            const dialogRef = this.dialog.open(UsuariosSelComponent, {
                width: '600px',
            });

            this.subscriptions.add(dialogRef.afterClosed()
                .subscribe((result: Usuarios) => {
                    if (!result)
                        return;

                    this.atributos.fkUsuario = result;
                    this.atributos.usuarioTitularId = result.usuarioId;
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
            this.subscriptions.add(this.httpService.create('suscripciones/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('suscripciones/actualizar', this.atributos).subscribe(
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
