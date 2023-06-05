import { Component, createRef, RefObject } from 'react';

import style from './TaskDetails.module.css';
import Button from '../Button/Button';
import workflowArrow from '../../images/workflowArrow.png';
import Input from '../Input/Input';

const fetchUrl = `${process.env.REACT_APP_BACKEND_URL}/getTaskDetails`;
const moveUrl = `${process.env.REACT_APP_BACKEND_URL}/updateTask`;
const assignUrl = `${process.env.REACT_APP_BACKEND_URL}/assignTaskToMe`;

export interface TaskDetailsProps {
    id: string,
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface TaskDetailsState {
    expanded: boolean;
    fetchObj: any;
}


export default class TaskDetails extends Component<TaskDetailsProps, TaskDetailsState> {

    constructor(props: TaskDetailsProps) {
        super(props);
        this.state = {
            expanded: false,
            fetchObj: null,
        };

        const body = {
            taskId: this.props.id
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
                    console.log(body)
                    this.setState(
                        { fetchObj: body.taskDetails[0] }
                    )

                });
        } catch (err) {
            console.log("conn error");
        }
    };
    private assignToMe = () => {
        const body = {
            taskId: this.props.id,
            userId: sessionStorage.getItem("userId")
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
            const response = fetch(assignUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    if (body.updated)
                        // eslint-disable-next-line no-restricted-globals
                        //location.reload();
                        console.log(body)
                });
        } catch (err) {
            console.log("conn error");
        }
    }
    private move = (num: number) => {

        if (this.state.fetchObj.assignee.id != sessionStorage.getItem("userId")) {
            alert("Task is not assigned to You!!!")
            return;
        }
        const body = {
            taskId: this.props.id,
            status: num
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
            const response = fetch(moveUrl, requestOptions)
                .then((response) => response.json())
                .then((body) => {
                    if (body.updated)
                        // eslint-disable-next-line no-restricted-globals
                        location.reload();
                });
        } catch (err) {
            console.log("conn error");
        }
    }
    private back = () => {
        if (this.state.fetchObj.stage != 0)
            this.move(-1)
    }
    private forward = () => {
        if (this.state.fetchObj.stage != 4)
            this.move(1)
    }
    render() {
        return (

            <div className={[style.task, this.props.className].join(' ')}>
                {this.state.fetchObj ?
                    <><div className={style.workflow}>
                        <div className={style.fieldInfo}>Workflow:</div >

                        {this.state.fetchObj.stage === 0 ?
                            <div className={style.workflowElementActive}>Created task</div>
                            : <div className={style.workflowElement}>Created task</div>
                        }<img src={workflowArrow} alt='arrow' />

                        {this.state.fetchObj.stage === 1 ?
                            <div className={style.workflowElementActive}>Work in progress</div>
                            : <div className={style.workflowElement}>Work in progress</div>
                        }<img src={workflowArrow} alt='arrow' />

                        {this.state.fetchObj.stage === 2 ?
                            <div className={style.workflowElementActive}>Testing</div>
                            : <div className={style.workflowElement}>Testing</div>
                        }<img src={workflowArrow} alt='arrow' />

                        {this.state.fetchObj.stage === 3 ?
                            <div className={style.workflowElementActive}>Ready for production</div>
                            : <div className={style.workflowElement}>Ready for production</div>
                        }<img src={workflowArrow} alt='arrow' />
                        {this.state.fetchObj.stage === 4 ?
                            <div className={style.workflowElementActive}>Compeleted</div>
                            : <div className={style.workflowElement}>Compeleted</div>
                        }

                    </div>


                        <div className={style.row}>
                            <div className={style.taskField}>
                                <div className={style.fieldInfo}>Created by:</div >
                                {this.state.fetchObj.creator.name}</div>
                            <div className={style.taskField}>
                                <div className={style.fieldInfo}>Due:</div >
                                {this.state.fetchObj.dueDate}</div>
                        </div>
                        <div className={style.taksDescription}>
                            <div className={style.fieldInfo}>Title:</div >
                            {this.state.fetchObj.title}
                        </div>
                        <div className={style.taksDescription}>
                            <div className={style.fieldInfo}>Description:</div >
                            {this.state.fetchObj.description}
                        </div>

                        <div className={style.row}>
                            <div className={style.taskField}>
                                <div className={style.fieldInfo}>Assigned to group:</div >
                                {this.state.fetchObj.group != null ? this.state.fetchObj.group.name : null}
                            </div>
                            <div className={style.taskField}>
                                <div className={style.fieldInfo}>Assigned to:</div >
                                {this.state.fetchObj.assignee ? this.state.fetchObj.assignee.name : "Not assigned"}
                            </div>
                        </div>
                        {this.state.fetchObj.assignee != null ?
                            <div className={style.row}>
                                <Button onClick={this.back} text="Move backward..." ></Button>
                                <Button onClick={this.forward} text="Move forward..."></Button>
                            </div>
                            :
                            <div className={style.row}>
                                <Button onClick={this.assignToMe} text="Assign task to me" ></Button>
                            </div>
                        }
                    </>
                    : null}

            </div>
        );
    }
}

