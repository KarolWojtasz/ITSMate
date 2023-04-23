import { Component, createRef, RefObject } from 'react';

import style from './TaskDetails.module.css';
import Button from '../Button/Button';
import workflowArrow from '../../images/workflowArrow.png';
export interface TaskDetailsProps {
    id: string,
    description: string;
    due: string;
    creator: string;
    workflow: number;
    images?: string;
    group: string;
    assignedTo: string;
    onClick?: () => void;
    useRef?: RefObject<HTMLInputElement>;
    className?: string;
}
export interface TaskDetailsState {
    expanded: boolean;
}


export default class TaskDetails extends Component<TaskDetailsProps, TaskDetailsState> {

    constructor(props: TaskDetailsProps) {
        super(props);
        this.state = {
            expanded: false,
        };


    };
    componentDidMount = () => {
        console.log(document.getElementsByClassName('workflowElement')[this.props.workflow]);
    }
    render() {
        return (
            <div className={[style.task, this.props.className].join(' ')}>
                <div className={style.workflow}>
                    <div className={style.fieldInfo}>Workflow:</div >

                    {this.props.workflow === 0 ?
                        <div className={style.workflowElementActive}>Created task</div>
                        : <div className={style.workflowElement}>Created task</div>
                    }<img src={workflowArrow} alt='arrow' />

                    {this.props.workflow === 1 ?
                        <div className={style.workflowElementActive}>Work in progress</div>
                        : <div className={style.workflowElement}>Work in progress</div>
                    }<img src={workflowArrow} alt='arrow' />

                    {this.props.workflow === 2 ?
                        <div className={style.workflowElementActive}>Testing</div>
                        : <div className={style.workflowElement}>Testing</div>
                    }<img src={workflowArrow} alt='arrow' />

                    {this.props.workflow === 3 ?
                        <div className={style.workflowElementActive}>Ready for production</div>
                        : <div className={style.workflowElement}>Ready for production</div>
                    }<img src={workflowArrow} alt='arrow' />
                    {this.props.workflow === 4 ?
                        <div className={style.workflowElementActive}>Compeleted</div>
                        : <div className={style.workflowElement}>Compeleted</div>
                    }

                </div>


                <div className={style.row}>
                    <div className={style.taskField}>
                        <div className={style.fieldInfo}>Created by:</div >
                        {this.props.creator}</div>
                    <div className={style.taskField}>
                        <div className={style.fieldInfo}>Due:</div >
                        {this.props.due}</div>
                </div>

                <div className={style.taksDescription}>
                    <div className={style.fieldInfo}>Description:</div >
                    {this.props.description}
                </div>
                {this.props.images != null ?
                    <div className={style.taskField}>
                        <div className={style.fieldInfo}>Images:</div >
                        {this.props.images}
                    </div>
                    : null}
                <div className={style.row}>
                    <div className={style.taskField}>
                        <div className={style.fieldInfo}>Assigned to group:</div >
                        {this.props.group}</div>
                    <div className={style.taskField}>
                        <div className={style.fieldInfo}>Assigned to:</div >
                        {this.props.assignedTo}</div>
                </div>
                <div className={style.row}>

                    <Button text="Move backward..."></Button>
                    <Button text="Move forward..."></Button>
                </div>
            </div>
        );
    }
}

