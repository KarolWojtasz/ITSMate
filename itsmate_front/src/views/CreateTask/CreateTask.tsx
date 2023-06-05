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

            </LeftBar>
            <RightBar title='Create task'>

                <Create></Create>
            </RightBar>
        </Page>
    );
}


export default CreateTask;

