import { MouseEvent } from 'react';

export interface IButton {
    text: string;
    handleClick: (event: MouseEvent) => any
}

export interface IBasicLayoutProps {
    cssClass: string;
    title: string;
    subtitle?: string;
    help?: Array<any>;
    button?: IButton;
    spinner?: boolean;
}