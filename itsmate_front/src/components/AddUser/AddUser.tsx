import { Component, createRef, RefObject } from 'react';

import style from './AddUser.module.css';
import Button from '../Button/Button';
const createUrl = `${process.env.REACT_APP_BACKEND_URL}/addUser`;
export interface AddUserProps {
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface AddUserState {
    expanded: boolean;
}


export default class AddUser extends Component<AddUserProps, AddUserState> {
    private name!: RefObject<HTMLInputElement>;
    private email!: RefObject<HTMLInputElement>;
    private password!: RefObject<HTMLInputElement>;
    private passwordConfirm!: RefObject<HTMLInputElement>;
    private manager!: RefObject<HTMLInputElement>;

    constructor(props: AddUserProps) {
        super(props);
        this.state = {
            expanded: false,
        };
        this.name = createRef();
        this.email = createRef();
        this.password = createRef();
        this.passwordConfirm = createRef();
        this.manager = createRef();

    };
    createUser = () => {
        if (this.name.current?.value === "" || this.email.current?.value === "" || this.password.current?.value === "" || this.passwordConfirm.current?.value === "")
            return;
        console.log("XD")
        const body = {
            name: this.name.current?.value,
            email: this.email.current?.value,
            password: this.password.current?.value,
            passwordConfirm: this.passwordConfirm.current?.value,
            isManager: this.manager.current?.value,
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
                    console.log(body)
                    if (body.message == "registered")
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                    else
                        alert(body.message)
                });
        } catch (err) {
            console.log("conn error");
        }

    }

    render() {
        return (
            <div className={[style.createUser, this.props.className].join(' ')}>
                <h1>Add new user</h1>
                <input type="text" placeholder="name" className={style.userInput} ref={this.name}></input>
                <input type="email" placeholder="email" className={style.userInput} ref={this.email}></input>
                <input type="password" placeholder="password" className={style.userInput} ref={this.password}></input>
                <input type="password" placeholder="confirm password" className={style.userInput} ref={this.passwordConfirm}></input>

                <label className={style.managerLabel}>Manager<input type="checkbox" placeholder="Manager" className={style.manager} ref={this.manager}></input></label>

                <Button onClick={this.createUser} text="Create user"></Button>
            </div>
        );
    }
}

