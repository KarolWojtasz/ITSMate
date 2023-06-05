import style from './UsersManager.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import AddGroup from '../../components/AddGroup/AddGroup';
import GroupList from '../../components/GroupList/GroupList';
import AddUser from '../../components/AddUser/AddUser';
import UsersList from '../../components/UsersList/UsersList';



function UsersManager() {


    return (
        <Page>
            <LeftBar>
            </LeftBar>
            <RightBar title='Manage groups'>
                <AddGroup></AddGroup>
                <GroupList></GroupList>
                <AddUser></AddUser>
                <UsersList></UsersList>
            </RightBar>
        </Page>
    );
}


export default UsersManager;

