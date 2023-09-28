import {
    trigger,
    animate,
    transition,
    style
} from '@angular/animations';

const animTime = '0.15s ease-in';

export const gridRowAnimation = trigger('gridRowAnimation', [
    transition('void => *', [
        style({ position: 'relative', top: '50px', zIndex: 100, backgroundColor: '#fff', opacity: 0 }),
        animate(animTime, style({ top: '0px', opacity: 1 }))
    ]),
    transition('* => void', [
        style({ position: 'relative', opacity: 1 }),
        animate(animTime, style({ opacity: 0 }))
    ])
]);
