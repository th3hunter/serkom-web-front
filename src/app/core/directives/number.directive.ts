import { Directive, EventEmitter, HostListener, Output, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[ngModel][appNumber]'
})
export class NumberDirective {
    @Input() dataType: string;
    @Input() value: string;

    private allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
    ];

    inputElement: HTMLInputElement;

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): boolean {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter, numbers and decimal point
            this.allowedKeys.indexOf(e.key) !== -1 ||
            (e.key === '.' && this.dataType === 'decimal' && this.inputElement.value.indexOf('.') < 0) || // Alow: . if decimal
            (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
            (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
            (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
            (e.key === 'x' && e.metaKey === true)) {

            return true;  // let it happen, don't do anything

        } else {
            // Si es cualquier otra tecla, no permite
            e.preventDefault();
            return false;
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        event.preventDefault();

        // get a digit-only string
        const pastedInput: string = event.clipboardData.getData('text/plain').replace(/\D/g, '');

        document.execCommand('insertText', false, pastedInput);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        event.preventDefault();

        const textData = event.dataTransfer.getData('text').replace(/\D/g, '');

        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    }

    constructor(public el: ElementRef) {
        this.inputElement = el.nativeElement;
    }

}
