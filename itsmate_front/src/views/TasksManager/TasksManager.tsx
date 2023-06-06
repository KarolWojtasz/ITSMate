import style from './TasksManager.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import RightBar from '../../components/RightBar/RightBar';
import LeftBar from '../../components/LeftBar/LeftBar';
import TaskContainer from '../../components/TaskContainer/TaskContainer';
import TaskAdmin from '../../components/TaskAdmin/TaskAdmin';



function TasksManager() {


    return (
        <Page>
            <LeftBar>
            </LeftBar>
            <RightBar title='Manage tasks'>
                <TaskAdmin ></TaskAdmin>
            </RightBar>
        </Page>
    );
}


export default TasksManager;

