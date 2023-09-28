import {
    trigger,
    animate,
    transition,
    style,
    query,
    group,
} from '@angular/animations';

const animTime = '0.25s ease-in-out';

export const subRouterAnimation = trigger('routerAnimation', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':leave', style({ position: 'absolute', left: 0, zIndex: 10, width: '100%' }), { optional: true }),
        // query(':leave', style({ zIndex: 10, width: '784px' }), { optional: true }),
        group([
            query(':enter', animate(animTime, style({ opacity: 1 })), { optional: true }),
            query(':leave', animate(animTime, style({ opacity: 0 })), { optional: true }),
        ])
    ])
]);
