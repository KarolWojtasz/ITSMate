import { Component, createRef, RefObject } from 'react';

import style from './Task.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export interface TaskProps {
    id: string,
    description: string;
    due: string;
    creator: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface TaskState {
    expanded: boolean;
}
// eslint-disable-next-line react-hooks/rules-of-hooks


export default class Task extends Component<TaskProps, TaskState> {

    constructor(props: TaskProps) {
        super(props);
        this.state = {
            expanded: false,
        };

    };
    private redirectToTask = () => {
        window.location.href = "/Task?" + this.props.id;
    }


    render() {
        return (
            <div className={[style.task, this.props.className].join(' ')}>
                <div className={style.taksID}>
                    {this.props.id}
                </div>
                <div className={style.taksDescription}>
                    <div className={style.fieldInfo}>Description:</div >
                    {this.props.description}
                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Due:</div >
                    {this.props.due}</div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Created by:</div >
                    {this.props.creator}</div>
                <Button onClick={this.redirectToTask} text="More details"></Button>
            </div>
        );
    }
}

