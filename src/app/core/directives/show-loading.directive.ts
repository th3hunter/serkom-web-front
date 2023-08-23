import { AfterViewChecked, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appShowLoading]'
})
export class ShowLoadingDirective implements OnInit, AfterViewChecked {

    element: any;

    @Input()
    appShowLoading: boolean;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        // Añade un SPAN al texto del botón
        this.element = this.el.nativeElement;
        // this.element.innerHTML = `<span>${this.element.innerHTML}</span><img src="/assets/ripple-loading.svg" alt="" height="48" style='display: none: margin-top: -24px;'>`;

        const spanNode = document.createElement('span');
        const imgNode = document.createElement('img');

        spanNode.textContent = this.element.innerHTML;
        imgNode.src = '/assets/ripple-loading.svg';
        imgNode.style.display = 'none';
        imgNode.style.height = '48px';
        imgNode.style.margin = '-14px auto -34px';
        this.element.textContent = '';

        this.element.insertBefore(spanNode, this.element.firstChild);
        this.element.insertBefore(imgNode, this.element.firstChild);
    }

    ngAfterViewChecked(): void {
        if (this.appShowLoading) {
            this.element.querySelector('span').style.visibility = 'hidden';
            this.element.querySelector('img').style.display = 'block';
            this.element.disabled = true;
        }
        else {
            this.element.querySelector('span').style.visibility = 'visible';
            this.element.querySelector('img').style.display = 'none';
            this.element.disabled = false;
        }
    }

}
