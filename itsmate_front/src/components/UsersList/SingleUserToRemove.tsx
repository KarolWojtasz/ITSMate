import { Component, createRef, RefObject } from 'react';

import style from './UsersList.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

const deleteUrl = `${process.env.REACT_APP_BACKEND_URL}/deleteUser`;

export interface SingleUserToRemoveProps {
    userId: string;
    name: string;
    email: string;
    isManager: boolean;
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}

export default class SingleUserToRemove extends Component<SingleUserToRemoveProps> {


    constructor(props: SingleUserToRemoveProps) {
        super(props);
    };
    deleteUser = () => {
        const body = {
            userId: this.props.userId,
        }
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(body)

        };
        try {
            const response = fetch(deleteUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    console.log(body)
                    if (body.deleted)
                        // eslint-disable-next-line no-restricted-globals
                        location.reload()
                });
        } catch (err) {
            console.log("conn error");
        }
    }

    render() {
        return (
            <div className={[style.singleUser, this.props.className].join(' ')}>
                <div>{this.props.name}</div>
                <div>{this.props.email}</div>
                <div>{this.props.isManager ? <>Manager</> : <>User</>}</div>
                <button onClick={this.deleteUser} className={style.removeMember}>Delete user</button>
            </div>
        );
    }
}

