import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "./helpers";

export const LoggedIn = (props: any) => {
    let navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(isUserAuthenticated());
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
            const userType = localStorage.getItem('role')?.toLowerCase();
            if (userType === 'student') {
                navigate('/student/home');
            } else if (userType === 'recruiter') {
                navigate('/recruiter/home');
            } else {
                navigate('/authenticate');
            }
        }
    };

    useEffect(() => {
        checkUserToken();
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            {!isAuthenticated? props.children : null}
        </React.Fragment>
    )
};