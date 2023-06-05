import { Component, createRef, RefObject } from 'react';

import style from './GroupList.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import GroupMembers from '../GroupMembers/GroupMembers';
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getGroups`;
const createUrl = `${process.env.REACT_APP_BACKEND_URL}/addTask`;
export interface GroupListProps {
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface GroupListState {
    expanded: boolean;
    groups: Array<JSX.Element>
}


export default class GroupList extends Component<GroupListProps, GroupListState> {


    constructor(props: GroupListProps) {
        super(props);
        this.state = {
            expanded: false,
            groups: []
        };

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
                    console.log(body)
                    let array: Array<JSX.Element> = []
                    body.allGroups.forEach((group: any) => {
                        array.push(
                            <GroupMembers key={group.id} id={group.id} name={group.name} ></GroupMembers>
                        )
                    });
                    this.setState({
                        groups: array,
                    })
                });
        } catch (err) {
            console.log("conn error");
        }


    };

    render() {
        return (
            <div className={[style.groupList, this.props.className].join(' ')}>
                {this.state.groups}
            </div>
        );
    }
}

