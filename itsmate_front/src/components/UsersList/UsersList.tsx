import { Component, createRef, RefObject } from 'react';

import style from './UsersList.module.css';
import SingleUserToRemove from './SingleUserToRemove';

const getUsers = `${process.env.REACT_APP_BACKEND_URL}/getUsers`;

export interface UsersListProps {

    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface UsersListState {
    users: Array<JSX.Element>
}


export default class UsersList extends Component<UsersListProps, UsersListState> {
    private userSelect!: RefObject<HTMLSelectElement>;


    constructor(props: UsersListProps) {
        super(props);
        this.state = {
            users: []
        };

        const requestOptions2 = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        };
        try {
            const response = fetch(getUsers, requestOptions2)
                .then((response) => response.json())
                .then((body) => {
                    console.log(body)
                    let array: Array<JSX.Element> = []
                    body.allusers.forEach((user: any) => {
                        array.push(
                            <SingleUserToRemove key={user.id} userId={user.id} email={user.email} name={user.name} isManager={user.isManager}></SingleUserToRemove>
                        )
                    });
                    this.setState({
                        users: array,
                    })
                });
        } catch (err) {
            console.log("conn error");
        }
    };



    render() {
        return (
            <div className={[style.users, this.props.className].join(' ')}>
                <h1 className={style.list}>Users list</h1>
                <div className={style.members}>
                    {this.state.users}
                </div>
            </div>
        );
    }
}

