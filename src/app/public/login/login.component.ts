import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials } from 'src/app/core/interfaces/Credentials';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    usuario: string;
    password: string;
    loading: boolean;

    subscriptions = new Subscription();

    constructor(private httpService: HttpService,
                private loginService: LoginService,
                private router: Router) {}

    login(): void {
        this.loading = true;

        this.subscriptions.add(this.httpService.post<Credentials>('sesion/login', [
            { name: 'usuario', value: this.usuario },
            { name: 'password', value: this.password },
        ]).subscribe(res => {
            this.loading = false;

            if (res.code == 200) {
                this.loginService.login(res.item);
                this.router.navigate(['/mi-cuenta']);
            }
        }));
    }

}
