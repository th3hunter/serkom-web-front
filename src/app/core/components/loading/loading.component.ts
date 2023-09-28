import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

    @Input()
    color: string;

    @Input()
    height: string;

    @Input()
    margin: string;

    constructor() {
        this.color = "secondary";
        this.height = "64";
        this.margin = "40px 0";
    }

}
