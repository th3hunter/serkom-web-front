import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TipoDatoConfiguracion } from 'src/app/common/enums';
import { EnumHelper } from 'src/app/common/helpers/enums';
import { Configuraciones } from 'src/app/common/models/configuraciones';
import { TiposConfiguracion } from 'src/app/common/models/tipos-configuracion';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-configuraciones-trn',
  templateUrl: './configuraciones-trn.component.html',
  styleUrls: ['./configuraciones-trn.component.scss']
})
export class ConfiguracionesTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as Configuraciones;
    tiposConfiguracion = [] as TiposConfiguracion[];
    tiposDato = EnumHelper.toList(TipoDatoConfiguracion)

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<ConfiguracionesTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        this.subscriptions.add(this.httpService.list<TiposConfiguracion>('tipos-configuracion/listar', [
            { name: 'estado', value: '1' }
        ]).subscribe(res => {
            this.tiposConfiguracion = res.items;
        }));

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Configuraciones>('configuraciones/mostrar', [
                { name: 'tipoConfiguracionId', value: this.data.tipoConfiguracionId },
                { name: 'configuracionId', value: this.data.configuracionId },
            ]).subscribe(res => {
                this.atributos = res.item;
                this.loading = false;
            }));
        } else {
            // Valores default
        }
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
            this.subscriptions.add(this.httpService.create('configuraciones/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('configuraciones/actualizar', this.atributos).subscribe(
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
