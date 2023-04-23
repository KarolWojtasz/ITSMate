import style from './Home.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Button from '../../components/Button/Button';
import Task from '../../components/Task/Task';



function GroupTasks() {


    return (
        <Page>

            <LeftBar>
                <h3>Hello Karol</h3>
                <Button text='Create task' onClick={() => window.location.href = '/CreateTask'} ></Button>
                <Button text='My group tasks' onClick={() => window.location.href = '/GroupTasks'} ></Button>
                <Button text='My task' onClick={() => window.location.href = '/'} ></Button>
                <Button text='Logout' onClick={() => window.location.href = '/Login'} ></Button>
            </LeftBar>
            <RightBar title='Tasks assigned to my group'>
                <Task id={'TSK1123233'} description={'Please update windows on my PC'} due={'10.03.2023'} creator={'Super admin'}  ></Task>
                <Task id={'TSK1123233'} description={'Please update windows on my PC'} due={'10.03.2023'} creator={'Super admin'}  ></Task>
                <Task id={'TSK1123233'} description={'Please update windows on my PC'} due={'10.03.2023'} creator={'Super admin'}  ></Task>

            </RightBar>
        </Page>
    );
}


export default GroupTasks;

