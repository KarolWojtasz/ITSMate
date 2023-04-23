import style from './CreateTask.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import Button from '../../components/Button/Button';
import RightBar from '../../components/RightBar/RightBar';
import Task from '../../components/Task/Task';
import Create from '../../components/Create/Create';



function CreateTask() {


    return (
        <Page>
            <LeftBar>
                <h3>Hello Karol</h3>
                <Button text='Create task' onClick={() => window.location.href = '/CreateTask'} ></Button>
                <Button text='My group tasks' onClick={() => window.location.href = '/GroupTasks'} ></Button>
                <Button text='My task' onClick={() => window.location.href = '/'} ></Button>
                <Button text='Logout' onClick={() => window.location.href = '/Login'} ></Button>
            </LeftBar>
            <RightBar title='Create task'>

                <Create></Create>
            </RightBar>
        </Page>
    );
}


export default CreateTask;

