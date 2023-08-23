import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Credentials } from '../interfaces/Credentials';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _credentials$: Subject<Credentials> = new Subject<Credentials>();

    credentials = this._credentials$.asObservable();

    constructor(private httpService: HttpService) { }

    /**
     * Inicia sesión
     * @param credentials Las credenciales
     */
    login(credentials: Credentials): void {
        localStorage.setItem('token', credentials.token);
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('usuarioId', credentials.usuarioId.toString());
        localStorage.setItem('nombreUsuario', credentials.nombreUsuario);
        localStorage.setItem('versionApi', credentials.versionApi);

        // Notifica a los observers
        this._credentials$.next(credentials);
    }

    /**
     * Cierra la sesión
     */
    logout(): void {
        // Limpia las credenciales en el storage
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('nombreUsuario');

        // Notifica a los observers
        this._credentials$.next(null);
    }
}
