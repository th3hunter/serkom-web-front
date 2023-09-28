import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/common/enums';
import { Credentials } from 'src/app/core/interfaces/Credentials';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

    usuario: string;
    password: string;
    loading: boolean;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private loginService: LoginService,
                private router: Router,
                private dialog: MatDialog) {}

    ngOnInit(): void {
        // Cierra todos los dialogs que puedan estar abiertos
        this.dialog.closeAll();
    }

    login(): void {
        this.loading = true;

        this.subscriptions.add(this.httpService.post<Credentials>('sesion/login', [
            { name: 'usuario', value: this.usuario },
            { name: 'password', value: this.password },
        ]).subscribe(res => {
            this.loading = false;

            if (res.code == 200) {
                this.loginService.login(res.item);

                if (res.item.tipoUsuario == TipoUsuario.NORMAL)
                    this.router.navigate(['/mi-cuenta']);
                else
                    this.router.navigate(['/admin']);
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
