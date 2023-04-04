import style from './UsersManager.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function UsersManager() {


    return (
        <Page>
            <span className={style.catchphrase}>UsersManager</span>
        </Page>
    );
}


export default UsersManager;

