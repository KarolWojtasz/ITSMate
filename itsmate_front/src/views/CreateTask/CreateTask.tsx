import style from './CreateTask.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function CreateTask() {


    return (
        <Page>
            <span className={style.catchphrase}>Create task</span>
        </Page>
    );
}


export default CreateTask;

