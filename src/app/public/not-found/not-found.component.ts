import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        // Cierra todos los dialogs que puedan estar abiertos
        this.dialog.closeAll();
    }

}
