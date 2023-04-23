import style from './LeftBar.module.css';

import { Component, HTMLAttributes } from 'react';
import logo from "../../images/logo.png";
interface LeftBarProps {
    user?: boolean;
    content?: boolean;
    background?: boolean;
    contentClassName?: string;
    children?: HTMLAttributes<HTMLDivElement>['children'];
}

export default class LeftBar extends Component<LeftBarProps> {
    private static defaultProps: LeftBarProps = {
        user: true,
        content: true,
        background: false,
        contentClassName: '',
    };

    render() {
        return (
            <div className={style.leftBar}>
                <img className={style.logo} src={logo} alt="logo" />
                <div className={style.buttonsContainer}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

