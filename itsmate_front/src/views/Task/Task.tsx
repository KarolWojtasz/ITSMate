import style from './Task.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function Task() {


    return (
        <Page>
            <span className={style.catchphrase}>Task 2343534647</span>
        </Page>
    );
}


export default Task;

