import style from './Home.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'react-router-dom';



function Home() {


  return (
    <Page>
      <span className={style.catchphrase}>HOME PAGE</span>
    </Page>
  );
}


export default Home;

