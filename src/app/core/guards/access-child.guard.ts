import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AccessChildGuard implements CanActivateChild {

    constructor(public httpService: HttpService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: any) { }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!isPlatformBrowser(this.platformId))
            return false;

        // Arma la ruta completa
        const ruta = childRoute.parent.routeConfig.path + '/' + childRoute.routeConfig.path;

        return this.httpService.post<boolean>('accesos', [
            { name: 'ruta', value: ruta }
        ]).pipe(
            map((res) => {
                const autoriza = res.item;

                // Si no autoriza, redirecciono
                if (!autoriza) {
                    this.router.navigate(['/401']);
                }

                return autoriza;
            })
        );
    }

}
