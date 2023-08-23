import {
    trigger,
    animate,
    transition,
    style
} from '@angular/animations';

const animTime = '0.5s ease-in';

export const shrinkAnimation = trigger('shrinkAnimation', [
    transition('void => *', [
        style({ position: 'absolute', opacity: 0, transform: 'scale(0.75)', width: '100%' }),
        animate(animTime, style({ opacity: 1, transform: 'scale(1)' }))
    ]),
    transition('* => void', [
        style({ position: 'absolute', opacity: 1, width: '100%' }),
        animate(animTime, style({ opacity: 0, transform: 'scale(0.75)' }))
    ])
]);

export const opacityAnimation = trigger('opacityAnimation', [
    transition('void => *', [
        style({ position: 'absolute', opacity: 0, zIndex: 2 }),
        animate(animTime, style({ opacity: 1 }))
    ]),
    transition('* => void', [
        style({ position: 'absolute', opacity: 1, zIndex: 1 }),
        animate(animTime, style({ opacity: 0 }))
    ])
]);

export const shrinkFullAnimation = trigger('shrinkFullAnimation', [
    transition('void => *', [
        style({ position: 'relative', transform: 'scale(0)' }),
        animate(animTime, style({ transform: 'scale(1)' }))
    ]),
    transition('* => void', [
        style({ position: 'relative', transform: 'scale(1)' }),
        animate(animTime, style({ transform: 'scale(0)' }))
    ])
]);
