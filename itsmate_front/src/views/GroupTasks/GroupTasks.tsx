import style from './GroupTasks.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function GroupTasks() {


    return (
        <Page>
            <span className={style.catchphrase}>GroupTasks</span>
        </Page>
    );
}


export default GroupTasks;

