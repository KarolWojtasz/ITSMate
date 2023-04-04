import style from './TasksManager.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function TasksManager() {


    return (
        <Page>
            <span className={style.catchphrase}>Task manager</span>
        </Page>
    );
}


export default TasksManager;

