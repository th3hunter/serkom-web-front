import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    @Input() title: string;
    @Input() loading: boolean;
    @Input() hideButtons: string;
    @Input() okText: string = 'Ok';
    @Input() cancelText: string = 'Cancelar';

    // OUTPUTS
    @Output() ok = new EventEmitter<null>();
    @Output() cancel = new EventEmitter<null>();

    constructor() { }

}
