import style from './LeftBar.module.css';

import { Component, HTMLAttributes } from 'react';
import logo from "../../images/logo.png";
import Button from '../Button/Button';
import { isManager } from '../../auth';
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
                    <Button text='Create task' onClick={() => window.location.href = '/CreateTask'} ></Button>

                    {isManager() ?
                        <><Button text='Manage users' onClick={() => window.location.href = '/usersManager'} ></Button>
                            <Button text='Manage tasks' onClick={() => window.location.href = '/tasksManager'} ></Button>
                        </>
                        : null}


                    <Button text='My group tasks' onClick={() => window.location.href = '/GroupTasks'} ></Button>
                    <Button text='My task' onClick={() => window.location.href = '/'} ></Button>
                    <Button text='Logout' onClick={() => window.location.href = '/Login'} ></Button>
                </div>
            </div>

        );
    }
}

