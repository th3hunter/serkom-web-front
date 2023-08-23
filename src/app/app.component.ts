import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { LoginService } from './core/services/login.service';
import { Subscription } from 'rxjs';
import { Credentials } from './core/interfaces/Credentials';
import { HttpService } from './core/services/http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'serkom-web';
    loading: boolean;

    subscriptions: Subscription = new Subscription();
    credentials: Credentials;

    constructor(private metaTagService: Meta,
                private loginService: LoginService,
                private httpService: HttpService) { }

    ngOnInit() {
        this.metaTagService.addTags([
            {
                name: 'keywords',
                content: 'Angular SEO Integration, Music CRUD, Angular Universal',
            },
            { name: 'robots', content: 'index, follow' },
            { name: 'author', content: 'Digamber Singh' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
            { charset: 'UTF-8' },
        ]);

        // Me suscribo a los servicios
        this.subscriptions.add(this.loginService.credentials.subscribe(credentials => {
            this.credentials = credentials;
        }));

        this.loading = true;

        // Verifica si la sesión es válida
        this.subscriptions.add(this.httpService.post<Credentials>('sesion/validar')
            .subscribe(res => {
                this.loading = false;

                if (res.code != 200)
                    return;

                if (!res.item)
                    return;

                this.loginService.login(res.item);
            }
        ));
    }
}
