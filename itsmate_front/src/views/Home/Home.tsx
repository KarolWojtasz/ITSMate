import style from './Home.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import RightBar from '../../components/RightBar/RightBar';
import Button from '../../components/Button/Button';
import Task from '../../components/Task/Task';
import { logout } from '../../auth';
import GroupTasks from '../GroupTasks/GroupTasks';
import TaskContainer from '../../components/TaskContainer/TaskContainer';



function Home() {


  return (
    <Page>

      <LeftBar>

      </LeftBar>
      <RightBar title='Tasks assigned to me'>
        <TaskContainer forUser={true}></TaskContainer>
      </RightBar>
    </Page>
  );
}


export default Home;

