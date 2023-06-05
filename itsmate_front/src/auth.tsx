import { Navigate, NavigateFunction } from 'react-router-dom';
const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/login`;
const logoutUrl = `${process.env.REACT_APP_BACKEND_URL}/logout`;
const fetchUserUrl = `${process.env.REACT_APP_BACKEND_URL}/user`;


interface UserState {
    username: string;
    sessionStart: Date;
    role: Role;
}

enum Role {
    ROLE_USER,
    ROLE_ADMIN,
}

interface User {
    username: string;
    role: Role;
}

export class InvalidSessionError extends Error {
    constructor() {
        super('Inalid session');
    }
}

export const removeSesionData = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isManager');
};

export const logout = async () => {
    removeSesionData();
    document.location.href = '/login';
};


export const isLoggedIn = (): boolean => {
    if (sessionStorage.getItem("userToken") !== undefined && sessionStorage.getItem("userToken") != 'undefined' && sessionStorage.getItem("userToken"))
        return true;
    else
        return false;
};

export const isManager = () => {
    if (!isLoggedIn()) return false;
    return sessionStorage.getItem("isManager") == "true"
};

export const login = async (email: string, password: string, navigate: NavigateFunction): Promise<string | void> => {


    const body = {
        email: email,
        password: password
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(body),
    };

    try {
        const response = await fetch(loginUrl, requestOptions)
            .then((response) => response.json())
            .then((body) => {
                console.log(body);
                sessionStorage.setItem("userToken", body.token);
                sessionStorage.setItem("userId", body.userId);
                sessionStorage.setItem("isManager", body.admin);

                navigate("/GroupTasks");
            });

    } catch (err) { }

};
