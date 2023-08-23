import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription, } from 'rxjs';
import { opacityAnimation } from 'src/app/core/animations/CommonAnimations';

@Component({
    selector: 'app-carrousel',
    templateUrl: './carrousel.component.html',
    styleUrls: ['./carrousel.component.scss'],
    animations: [ opacityAnimation ]
})
export class CarrouselComponent implements OnInit, OnDestroy {

    currentImage = 1;
    intervalRef: any;
    duration = 4000;
    isBrowser: boolean;

    suscriptions = new Subscription();

    constructor(@Inject(PLATFORM_ID) platformId: Object) {

        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void {
        if (this.isBrowser) {
        // if (false) {
            this.intervalRef = setInterval(() => {
                this.currentImage = this.currentImage == 3 ? 1 : this.currentImage == 0 ? 2 : this.currentImage + 1;
            }, this.duration);
        };
    }

    ngOnDestroy(): void {
        this.suscriptions.unsubscribe();
        clearInterval(this.intervalRef);
    }

}
