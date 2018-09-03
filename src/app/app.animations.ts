import { animate, state, style, transition, trigger } from '@angular/animations';

export function routerTransition() {
    return simpleFade();
}

export function routeFade() {
    return trigger('routerTransition', [
        state('void', style({opacity: 0})),
        state('*', style({opacity: 1})),
        transition(':enter', animate('1s ease-out', style({opacity: 1}))),
        transition(':leave', animate('1s ease-out', style({opacity: 0}))),
    ]);
}


export function slideToRight() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
}

export function slideToLeft() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}

export function slideToBottom() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(100%)' }))
        ])
    ]);
}

export function slideToTop() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}

export function simpleFade() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.5s ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 0 }),
            animate('0.5s ease-in-out', style({ opacity: 1 }))
        ])
    ]);
}

export function slowFade() {
    return trigger('routerTransition', [
        state('void', style({})),
        state('*', style({})),
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.8s ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 0 }),
            animate('0.8s ease-in-out', style({ opacity: 1 }))
        ])
    ]);
}
