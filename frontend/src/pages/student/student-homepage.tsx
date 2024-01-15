import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const StudentHomepage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const role = localStorage.getItem('role')?.toLowerCase();
            if (role !== 'student') {
                if (role === 'recruiter') {
                    navigate('/recruiter/home');
                } else {
                    navigate('/authenticate');
                }
            } 
        } else {
            navigate('/authenticate');
        }
    }, [token]);
    
    return (
        <div>
            <Typography variant="h4" component="h1">
                Student Homepage
            </Typography>
        </div>
    );
};