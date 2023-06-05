import { Component, createRef, RefObject } from 'react';

import style from './GroupMembers.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SingleUser from './SingleUser';

const getUsers = `${process.env.REACT_APP_BACKEND_URL}/getUsers`;
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getGroupMembers`;
const addUserToGroup = `${process.env.REACT_APP_BACKEND_URL}/addUserToGroup`;
const deleteGroup = `${process.env.REACT_APP_BACKEND_URL}/deleteGroup`;
export interface GroupMembersProps {
    id: string;
    name: string;
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface GroupMembersState {
    members: Array<JSX.Element>
    users: Array<object>
}


export default class GroupMembers extends Component<GroupMembersProps, GroupMembersState> {
    private userSelect!: RefObject<HTMLSelectElement>;


    constructor(props: GroupMembersProps) {
        super(props);
        this.state = {
            members: [],
            users: []
        };
        this.userSelect = createRef();
        const body = {
            groupId: this.props.id,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(body)

        };
        try {
            const response = fetch(fetchUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    let array: Array<JSX.Element> = []
                    body.groupMembers.forEach((member: any) => {
                        array.push(
                            <SingleUser key={member.id} userId={member.userId} groupId={member.groupId} name={member.user.name}></SingleUser>
                        )
                    });
                    this.setState({
                        members: array,
                    })
                });
        } catch (err) {
            console.log("conn error");
        }
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
                    this.setState({
                        users: body.allusers
                    })
                });
        } catch (err) {
            console.log("conn error");
        }
    };
    addUserToGroup = () => {
        const body = {
            userId: this.userSelect.current?.value,
            groupId: this.props.id
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(body)

        };
        try {
            const response = fetch(addUserToGroup, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    if (body.added)
                        // eslint-disable-next-line no-restricted-globals
                        location.reload()
                });
        } catch (err) {
            console.log("conn error");
        }
    }

    deleteGroup = () => {
        const body = {
            groupId: this.props.id
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
            const response = fetch(deleteGroup, requestOptions)
                .then((response) => response.json())
                .then((body) => {
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
            <div className={[style.groupMembers, this.props.className].join(' ')}>
                <Button onClick={this.deleteGroup} text='Remove group'></Button>
                <h3>{this.props.name}</h3>
                <div className={style.members}>
                    {this.state.members}
                    <select ref={this.userSelect} className={style.removeMember}>
                        {this.state.users.map((element: any) => <option key={element.id} value={element.id}>{element.name}</option>)}
                    </select>
                    <button onClick={this.addUserToGroup} className={style.removeMember}>Add user to group</button>
                </div>
            </div>
        );
    }
}

