import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

    constructor(private loginService: LoginService,
                private dialog: MatDialog) {}

    ngOnInit(): void {
        // Cierra todos los dialogs que puedan estar abiertos
        this.dialog.closeAll();

        // Notifico al observer de login
        this.loginService.logout();
    }

}
