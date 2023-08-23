import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    commentLabel: string = '';
    comentario: string;

    constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.commentLabel = data?.commentLabel || '';

    }

    ngOnInit(): void { }

    confirmar(): void {
        if (!this.commentLabel)
            this.dialogRef.close(true);
        else {
            if (!this.comentario) {
                this.toastr.error('Debe ingresar el ' + this.commentLabel);
                return;
            }
                
            this.dialogRef.close(this.comentario);
        }
            
    }

    cancelar(): void {
        this.dialogRef.close(false);
    }

}
