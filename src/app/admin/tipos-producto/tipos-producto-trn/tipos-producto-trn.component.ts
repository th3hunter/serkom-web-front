import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TiposProducto } from 'src/app/common/models/tipos-producto';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-tipos-producto-trn',
  templateUrl: './tipos-producto-trn.component.html',
  styleUrls: ['./tipos-producto-trn.component.scss']
})
export class TiposProductoTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as TiposProducto;

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<TiposProductoTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<TiposProducto>('tipos-producto/mostrar', [
                { name: 'tipoProductoId', value: this.data.tipoProductoId }
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
            this.subscriptions.add(this.httpService.create('tipos-producto/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('tipos-producto/actualizar', this.atributos).subscribe(
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
