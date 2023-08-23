import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

    constructor(public dialog: MatDialog) { }

    public open(message: string, commentLabel?: string): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message,
                commentLabel
            }
        });

        return dialogRef.afterClosed();
    }

}
