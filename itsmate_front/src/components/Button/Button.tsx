import { Component } from 'react';

import style from './Button.module.css';


export interface ButtonProps {
    link?: string,
    text: string;
    onClick?: () => void;
    width?: string;
    className?: string;
    id?: string;
}

export default class Button extends Component<ButtonProps> {

    render() {
        return (
            <button onClick={this.props.onClick} className={[style.buttonGrey].join(' ')} id={this.props.id}>
                {this.props.text}
            </button>
        );
    }
}

