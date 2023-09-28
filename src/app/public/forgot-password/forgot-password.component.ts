import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnDestroy {

    email: string;
    loading: boolean;

    subscriptions = new Subscription();

    @ViewChild(NgForm) form: NgForm;

    constructor(private httpService: HttpService,
                private toastr: ToastrService,
                private router: Router) {}

    restaurarPassword(): void {
        // Si no está todo válido, no hago nada
        if (!this.form.valid) {
            this.toastr.error('Ingrese todos los campos obligatorios');
            return;
        }

        this.loading = true;

        this.subscriptions.add(this.httpService.post<string>('usuarios/restaurar-password', [
            { name: 'email', value: this.email }
        ]).subscribe(res => {
            this.loading = true;

            // Redirecciona
            this.router.navigate(['/restaurar-contrasena', res.item])
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
