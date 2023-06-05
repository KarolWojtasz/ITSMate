import { Component, createRef, RefObject } from 'react';

import style from './AddGroup.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getGroups`;
const createUrl = `${process.env.REACT_APP_BACKEND_URL}/addGroup`;
export interface AddGroupProps {
    creator?: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface AddGroupState {
    expanded: boolean;
    options: Array<object>
}


export default class AddGroup extends Component<AddGroupProps, AddGroupState> {
    private name!: RefObject<HTMLInputElement>;
    constructor(props: AddGroupProps) {
        super(props);
        this.state = {
            expanded: false,
            options: []
        };
        this.name = createRef();
    };
    createGroup = () => {
        if (this.name.current?.value === "")
            return;
        const body = {
            name: this.name.current?.value,
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
                    if (body.message == "group created")
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                });
        } catch (err) {
            console.log("conn error");
        }

    }

    render() {
        return (
            <div className={[style.createGroup, this.props.className].join(' ')}>
                <Input useRef={this.name} text='name'></Input>
                <Button onClick={this.createGroup} text="Create group"></Button>
            </div>
        );
    }
}

