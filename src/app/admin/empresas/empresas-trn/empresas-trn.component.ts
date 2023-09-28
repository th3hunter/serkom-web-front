import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EstadoEmpresa } from 'src/app/common/enums';
import { EnumHelper } from 'src/app/common/helpers/enums';
import { Empresas } from 'src/app/common/models/empresas';
import { Suscripciones } from 'src/app/common/models/suscripciones';
import { Usuarios } from 'src/app/common/models/usuarios';
import { HttpService } from 'src/app/core/services/http.service';
import { SuscripcionesSelComponent } from '../../suscripciones/suscripciones-sel/suscripciones-sel.component';
import { Instancias } from 'src/app/common/models/instancias';

@Component({
    selector: 'app-empresas-trn',
    templateUrl: './empresas-trn.component.html',
    styleUrls: ['./empresas-trn.component.scss']
  })
export class EmpresasTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    estadosEmpresa = EnumHelper.toList(EstadoEmpresa);
    atributos = {} as Empresas;
    instancias: Instancias[];

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<EmpresasTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        this.atributos.fkSuscripcion = {} as Suscripciones;
        this.atributos.fkSuscripcion.fkUsuario = {} as Usuarios;

        // Carga las instancias
        this.subscriptions.add(this.httpService.list<Instancias>('instancias/listar', [
            { name: 'estado', value: '1' }
        ]).subscribe(res => {
            this.instancias = res.items;
        }));

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Empresas>('empresas/mostrar', [
                { name: 'empresaId', value: this.data.empresaId }
            ]).subscribe(res => {
                this.atributos = res.item;
                this.loading = false;
            }));
        } else {
            // Valores default
            this.atributos.estado = EstadoEmpresa.ACTIVA;
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
            this.subscriptions.add(this.httpService.create('empresas/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('empresas/actualizar', this.atributos).subscribe(
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
