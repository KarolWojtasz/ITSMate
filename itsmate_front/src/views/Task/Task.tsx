import style from './Task.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';
import LeftBar from '../../components/LeftBar/LeftBar';
import Button from '../../components/Button/Button';
import RightBar from '../../components/RightBar/RightBar';
import TaskDetails from '../../components/TaskDetails/TaskDetails';
import { useSearchParams } from 'react-router-dom';



function Task() {
    const [searchParams, setSearchParams] = useSearchParams();
    const taskId = searchParams.get("id");

    return (
        <Page>
            <LeftBar>
            </LeftBar>
            <RightBar title={taskId ? taskId : ""}>
                <TaskDetails id={taskId ? taskId : ""}></TaskDetails>
            </RightBar>
        </Page>
    );
}


export default Task;

