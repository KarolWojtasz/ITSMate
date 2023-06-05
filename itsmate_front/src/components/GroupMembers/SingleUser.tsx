import { Component, createRef, RefObject } from 'react';

import style from './GroupMembers.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

const deleteUrl = `${process.env.REACT_APP_BACKEND_URL}/deleteUserFromGroup`;
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getGroupMembers`;

export interface SingleUserProps {
    groupId: string;
    userId: string;
    name: string;
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}

export default class SingleUser extends Component<SingleUserProps> {


    constructor(props: SingleUserProps) {
        super(props);
    };
    deleteFromGroup = () => {
        const body = {
            userId: this.props.userId,
            groupId: this.props.groupId
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
                {this.props.name}
                <button onClick={this.deleteFromGroup} className={style.removeMember}>Delete from group</button>
            </div>
        );
    }
}

