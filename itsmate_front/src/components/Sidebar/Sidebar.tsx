import style from './Sidebar.module.css';

import { Component, HTMLAttributes } from 'react';

interface SidebarProps {
    title?: string;
    topbar?: boolean;
    titlebar?: boolean;
    user?: boolean;
    content?: boolean;
    background?: boolean;
    contentClassName?: string;
    children?: HTMLAttributes<HTMLDivElement>['children'];
}

export default class Sidebar extends Component<SidebarProps> {
    private static defaultProps: SidebarProps = {
        title: '',
        topbar: true,
        titlebar: true,
        user: true,
        content: true,
        background: false,
        contentClassName: '',
    };

    render() {
        return (
            <div className={style.sidebar}>

                Hello
            </div>

        );
    }

}

