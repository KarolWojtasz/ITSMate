import { Component, createRef, RefObject } from 'react';

import style from './Create.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getGroups`;
const createUrl = `${process.env.REACT_APP_BACKEND_URL}/addTask`;
export interface CreateProps {
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface CreateState {
    expanded: boolean;
    options: Array<object>
}


export default class Create extends Component<CreateProps, CreateState> {
    private desc!: RefObject<HTMLInputElement>;
    private due!: RefObject<HTMLInputElement>;
    private group!: RefObject<HTMLSelectElement>;
    private attach!: RefObject<HTMLInputElement>;
    private title!: RefObject<HTMLInputElement>;

    constructor(props: CreateProps) {
        super(props);
        this.state = {
            expanded: false,
            options: []
        };
        this.desc = createRef();
        this.due = createRef();
        this.group = createRef();
        this.attach = createRef();
        this.title = createRef();

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },

        };
        try {
            const response = fetch(fetchUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    this.setState(
                        { options: body.allGroups }
                    )
                });
        } catch (err) {
            console.log("conn error");
        }


    };
    createTask = () => {
        const body = {
            userId: sessionStorage.getItem("userId"),
            title: this.title.current?.value,
            dueDate: this.due.current?.value,
            attachment: this.attach.current?.value,
            description: this.desc.current?.value,
            groupId: this.group.current?.value,
        }
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(body)
        };
        try {
            const response = fetch(createUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    this.setState(
                        { options: body.allGroups }
                    )
                });
        } catch (err) {
            console.log("conn error");
        }

    }

    render() {
        return (
            <div className={[style.Createtask, this.props.className].join(' ')}>
                <div className={style.taksDescription}>
                    <div className={style.fieldInfo}>Title:</div >
                    <Input useRef={this.title} text={'Title'} ></Input>

                </div>
                <div className={style.taksDescription}>
                    <div className={style.fieldInfo}>Description:</div >
                    <Input useRef={this.desc} text={'Description'} ></Input>

                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Attachments:</div >
                    <input ref={this.attach} multiple className={style.createInput} type='file'></input>
                </div>

                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Due:</div >
                    <Input useRef={this.due} text={'Due date'} ></Input>

                </div>
                <div className={style.taskField}>
                    <div className={style.fieldInfo}>Assigned to group:</div >
                    <select className={style.select} ref={this.group}  >
                        {this.state.options.map((element: any) => <option key={element.id} value={element.id}>{element.name}</option>)}
                    </select>
                </div>
                <Button onClick={this.createTask} text="Create task"></Button>
            </div>
        );
    }
}

