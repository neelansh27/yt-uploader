import React, {type FC} from "react";
import { useAuth } from '../context/useAuth';
import {useNavigate} from "react-router";
// import Login from './Login';

const Protected: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    if (!user) {
        navigate('/login');
    }
    return (
        <div>
            { loading ?
                    <div>Loading...</div>:
            <div>
                {JSON.stringify(user)}
                {children}
            </div>
            }
        </div>
    );
};

export default Protected;