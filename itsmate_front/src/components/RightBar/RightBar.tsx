import style from './RightBar.module.css';

import { Component, HTMLAttributes } from 'react';


interface RightBarProps {
    title?: string;
    user?: boolean;
    content?: boolean;
    background?: boolean;
    contentClassName?: string;
    children?: HTMLAttributes<HTMLDivElement>['children'];
}

export default class RightBar extends Component<RightBarProps> {
    private static defaultProps: RightBarProps = {
        user: true,
        content: true,
        background: false,
        contentClassName: '',
    };

    render() {
        return (
            <div className={style.rightBar}>
                <h1>{this.props.title}</h1>
                <div className={style.contentItems}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

