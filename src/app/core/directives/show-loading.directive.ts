import { isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[appShowLoading]'
})
export class ShowLoadingDirective implements OnInit, AfterViewInit, AfterViewChecked {

    element: any;

    @Input()
    appShowLoading: boolean;

    constructor(private el: ElementRef,
                @Inject(PLATFORM_ID) private platformId: any) {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId))
            return;

        // Añade un SPAN al texto del botón
        this.element = this.el.nativeElement;
        const spanNode = document.createElement('span');
        const imgNode = document.createElement('img');

        spanNode.textContent = this.element.innerHTML;
        imgNode.src = '/assets/ripple-loading.svg';
        imgNode.style.display = 'none';
        imgNode.style.height = '48px';
        imgNode.style.margin = '-14px auto -44px';
        this.element.textContent = '';

        this.element.insertBefore(spanNode, this.element.firstChild);
        this.element.insertBefore(imgNode, this.element.firstChild);
    }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId))
            return;

        if (this.appShowLoading) {
            this.element.querySelector('span').style.visibility = 'hidden';
            this.element.querySelector('img').style.display = 'block';
            this.element.style.flexDirection = 'column';
            this.element.disabled = true;
        }
        else {
            this.element.querySelector('span').style.visibility = 'visible';
            this.element.querySelector('img').style.display = 'none';
            this.element.style.flexDirection = 'row';
            this.element.disabled = false;
        }
    }

}
