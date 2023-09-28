import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnDestroy {

    CodigoValidacion: number;
    password: string;
    confirmarPassword: string;
    loading: boolean;

    subscriptions = new Subscription();

    @ViewChild(NgForm) form: NgForm;

    constructor(private httpService: HttpService,
                private  route: ActivatedRoute,
                private toastr: ToastrService,
                private router: Router) {}

    cambiarPassword(): void {
        // Si no está todo válido, no hago nada
        if (!this.form.valid) {
            this.toastr.error('Ingrese todos los campos obligatorios');
            return;
        }

        // Valida que las contraseñas conincidan
        if (this.password != this.confirmarPassword) {
            this.toastr.error('Las contraseñas no coinciden');
            return;
        }

        this.loading = true;

        this.subscriptions.add(this.httpService.post<string>('usuarios/cambiar-password', [
            { name: 'uid', value: this.route.snapshot.paramMap.get('uid') },
            { name: 'codigoValidacion', value: this.CodigoValidacion },
            { name: 'password', value: this.password }
        ]).subscribe(res => {
            this.loading = false;

            if (res.code == 200) {
                this.toastr.success('Se cambió su contraseña, ahora puede iniciar sesión con ella');
                this.router.navigate(['/login'])
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
