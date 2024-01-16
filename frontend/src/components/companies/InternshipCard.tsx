import React from 'react';
import {CardContent, Typography, Button, CardActions, Card} from '@mui/material';
import InternshipCompanyDto from "../../models/InternshipCompanyDto";
import { useNavigate } from 'react-router-dom';

interface InternshipCardProps {
    internship: InternshipCompanyDto;
}

const InternshipCard: React.FC<InternshipCardProps> = ({internship}) => {
    const navigate = useNavigate();
    const handleClickOnCandidates = () => {
        navigate(`/recruiter/internship-candidates/${internship.internshipId}`);
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" style={{fontWeight: 'bold', marginBottom: 5}}>
                    {internship.title}
                </Typography>
                <Typography component="div">
                    <strong>Description</strong>
                    <div>{internship.description}</div>
                </Typography>
                <Typography component="div">
                    <strong>Location</strong>
                    <div>{internship.location}</div>
                </Typography>
                <Typography component="div">
                    <strong>Field</strong>
                    <div>{internship.field}</div>
                </Typography>
                <Typography component="div">
                    <strong>Salary</strong>
                    <div>{internship.salary} RON</div>
                </Typography>
                <Typography component="div">
                    <strong>Number of Positions</strong>
                    <div>{internship.positions}</div>
                </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    size="small"
                    style={{backgroundColor: '#4caf50'}} // Green pastel
                    variant="contained"
                    fullWidth
                    onClick={() => handleClickOnCandidates()}
                >
                    Applicants
                </Button>
                <Button
                    size="small"
                    style={{backgroundColor: '#2196f3', marginLeft: '8px', marginRight: '8px'}} // Blue
                    variant="contained"
                    fullWidth
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    style={{backgroundColor: '#f44336'}} // Red pastel
                    variant="contained"
                    fullWidth
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default InternshipCard;