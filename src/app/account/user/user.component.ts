import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Usuarios } from 'src/app/common/models/usuarios';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    loading: boolean;
    loadingGuardar: boolean;
    usuario = {} as Usuarios;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private toastr: ToastrService) {}

    ngOnInit(): void {
        this.loading = true;
        this.subscriptions.add(this.httpService.read<Usuarios>('usuarios/mostrar-datos')
            .subscribe(res => {
                this.loading = false;
                this.usuario = res.item;
                this.usuario.confirmarPassword = this.usuario.password;
            }
        ));
    }

    guardar(): void {
        this.loadingGuardar = true;
        this.subscriptions.add(this.httpService.update<Usuarios>('usuarios/actualizar-datos', this.usuario)
            .subscribe(res => {
                this.loadingGuardar = false;
                this.toastr.success("Se actualizaron sus datos con éxito");
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
