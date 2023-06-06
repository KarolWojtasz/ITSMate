import { Component, RefObject, useEffect } from 'react';
import style from './TaskAdmin.module.css';
import Task from '../Task/Task';
const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getAllTasks`;

export interface TaskContainerProps {
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface TaskContainerState {
    loaded: boolean;
}


export default class TaskContainer extends Component<TaskContainerProps, TaskContainerState> {
    res: Array<JSX.Element> = [];

    constructor(props: TaskContainerProps) {
        super(props);

        this.state = {
            loaded: false,
        };

    };

    componentDidMount() {
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
                    var array: Array<JSX.Element> = [];
                    body.tasks.forEach((task: any) => {
                        array.push(
                            <Task key={task.id} assignee={task.assignee != null ? task.assignee.name : "Not assigned"} id={task.id} description={task.description} due={task.dueDate} title={task.title}></Task>
                        )
                    }); this.res = array;
                    console.log(this.res)
                    this.setState(
                        { loaded: true }
                    )
                });
        } catch (err) {
            console.log("conn error");
        }
    }

    render() {
        return (
            <div className={[style.taskContainer, this.props.className].join(' ')}>
                {this.state.loaded ? this.res : null}
            </div>
        );
    }
}

