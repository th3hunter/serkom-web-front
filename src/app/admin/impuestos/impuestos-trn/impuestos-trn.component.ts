import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TipoCalculoImpuesto } from 'src/app/common/enums';
import { EnumHelper } from 'src/app/common/helpers/enums';
import { Impuestos } from 'src/app/common/models/impuestos';
import { TiposImpuesto } from 'src/app/common/models/tipos-impuesto';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-impuestos-trn',
  templateUrl: './impuestos-trn.component.html',
  styleUrls: ['./impuestos-trn.component.scss']
})
export class ImpuestosTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as Impuestos;
    tipoCalculo = EnumHelper.toList(TipoCalculoImpuesto);
    tiposImpuesto = [] as TiposImpuesto[];

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<ImpuestosTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        this.subscriptions.add(this.httpService.list<TiposImpuesto>('tipos-impuesto/listar', [
            { name: 'estado', value: '1' }
        ]).subscribe(res => {
            this.tiposImpuesto = res.items;
        }));

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Impuestos>('impuestos/mostrar', [
                { name: 'impuestoId', value: this.data.impuestoId }
            ]).subscribe(res => {
                this.atributos = res.item;
                this.loading = false;
            }));
        } else {
            // Valores default
            this.atributos.estado = '1';
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
            this.subscriptions.add(this.httpService.create('impuestos/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('impuestos/actualizar', this.atributos).subscribe(
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
