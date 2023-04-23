import style from './Task.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import Button from '../../components/Button/Button';
import RightBar from '../../components/RightBar/RightBar';
import TaskDetails from '../../components/TaskDetails/TaskDetails';



function Task() {


    return (
        <Page>
            <LeftBar>
                <Button text='Create task' onClick={() => window.location.href = '/CreateTask'} ></Button>
                <Button text='My group tasks' onClick={() => window.location.href = '/GroupTasks'} ></Button>
                <Button text='My task' onClick={() => window.location.href = '/'} ></Button>
                <Button text='Logout' onClick={() => window.location.href = '/Login'} ></Button>
            </LeftBar>
            <RightBar title='TSK1123213'>
                <TaskDetails id={'TSK1123213'}
                    description={'Please remove typos in lastest update'}
                    due={'10.03.2023'} creator={'Karol Wojtasz'} workflow={2} group={'Front-end dev'}
                    assignedTo={'Karol Wojtasz'}  ></TaskDetails>


            </RightBar>        </Page>
    );
}


export default Task;

