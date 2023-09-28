import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/common/enums';
import { EnumHelper } from 'src/app/common/helpers/enums';
import { Usuarios } from 'src/app/common/models/usuarios';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-usuarios-trn',
  templateUrl: './usuarios-trn.component.html',
  styleUrls: ['./usuarios-trn.component.scss']
})
export class UsuariosTrnComponent implements OnInit, OnDestroy {

    modo: string;
    loading: boolean;
    loadingGuardar: boolean;
    atributos = {} as Usuarios;
    tiposUsuario = EnumHelper.toList(TipoUsuario);

    @ViewChild(NgForm) form: NgForm;

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public dialogRef: MatDialogRef<UsuariosTrnComponent>,
                private toastr: ToastrService,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        // Obtiene el modo
        this.modo = this.data.mode;

        // Si es UPDATE obtengo los datos del servidor
        if (this.modo === 'upd') {
            this.loading = true;

            this.subscriptions.add(this.httpService.read<Usuarios>('usuarios/mostrar', [
                { name: 'usuarioId', value: this.data.usuarioId }
            ]).subscribe(res => {
                this.atributos = res.item;
                this.atributos.confirmarPassword = this.atributos.password;
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

        if (this.atributos.password != this.atributos.confirmarPassword) {
            this.toastr.error('Las contraseñas no coinciden');
            return;
        }

        this.loadingGuardar = true;

        // Si es INSERT
        if (this.modo === 'ins') {
            this.subscriptions.add(this.httpService.create('usuarios/insertar', this.atributos).subscribe(
                res => this.cancelar(true)
            ));
        }

        // Si es UPDATE
        if (this.modo === 'upd') {
            this.subscriptions.add(this.httpService.update('usuarios/actualizar', this.atributos).subscribe(
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
