import { Component, createRef, RefObject } from 'react';

import style from './Create.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

export interface CreateProps {
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface CreateState {
    expanded: boolean;
}
// eslint-disable-next-line react-hooks/rules-of-hooks


export default class Create extends Component<CreateProps, CreateState> {

    constructor(props: CreateProps) {
        super(props);
        this.state = {
            expanded: false,
        };

    };

    render() {
        return (
            <div className={[style.Createtask, this.props.className].join(' ')}>

                <div className={style.taksDescription}>
                    <div className={style.fieldInfo}>Description:</div >
                    <Input text={'Description'} ></Input>

                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Attachments:</div >
                    <input multiple className={style.createInput} placeholder='group name' type='file'></input>

                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Due:</div >
                    <Input text={'Due date'} ></Input>

                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Assigned to group:</div >
                    <Input text={'Group name'} ></Input>
                </div>
                <Button text="Create task"></Button>
            </div>
        );
    }
}

