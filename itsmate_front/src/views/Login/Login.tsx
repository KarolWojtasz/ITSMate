import style from './Login.module.css';

import Page from '../../components/Page/Page';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Input from '../../components/Input/Input';
import Logo from '../../images/logo.png';
import { login } from '../../auth';

const fetchUrl = "http://127.0.0.1:8080/login";


function Login() {
    const name = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();



    async function loginRequest() {
        if (name.current?.value != null && password.current?.value != null)
            login(name.current?.value, password.current?.value, navigate)
        // const body = {
        //     email: name.current?.value,
        //     password: password.current?.value,
        // };

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(body),
        // };

        // try {
        //     const response = await fetch(fetchUrl, requestOptions);
        //     if (!response.ok) throw response;

        //     navigate('/');
        // } catch (err) {
        //     if (err instanceof Response) {
        //         const message = await err.text();
        //         if (err.headers.get('Content-Type')?.includes('text/plain')) {
        //             alert(`Error: ${message}`);
        //         } else {
        //             if (err.status == 401)
        //                 alert('Bad credentials');
        //         }
        //     }
        // }
    };

    return (
        <Page content>
            <div className={style.container}>

                <div className={style.rightBar}>
                    <img src={Logo} alt='ITSMate logo' />

                    <div className={style.title}>Login</div>

                    <Input useRef={name} className={style.inputForm} type='email' text="Email" />
                    <Input useRef={password} type="password" className={style.inputForm} text="Password" />
                    <Button onClick={loginRequest} text="LOGIN" />
                </div>

            </div>
        </Page>
    );
}


export default Login;
