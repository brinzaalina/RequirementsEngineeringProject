import React from 'react';

import {CardContent, Typography, Button, CardActions, Card, Box} from '@mui/material';
import Internship from "../model/Internship";

interface InternshipCardProps {
    internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({internship}) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" style={{fontWeight: 'bold', marginBottom: 5}}>
                    {internship.title}
                </Typography>
                <Typography>
                    <Box style={{fontWeight: 'bold'}}>Description</Box>
                    {internship.description}
                </Typography>
                <Typography>
                    <Box style={{fontWeight: 'bold'}}>Location</Box>
                    {internship.location}
                </Typography>
                <Typography>
                    <Box style={{fontWeight: 'bold'}}>Field</Box>
                    {internship.field}
                </Typography>
                <Typography>
                    <Box style={{fontWeight: 'bold'}}>Salary</Box>
                    {internship.salary} RON
                </Typography>
                <Typography>
                    <Box style={{fontWeight: 'bold'}}>Number of Positions</Box>
                    {internship.positions}
                </Typography>
            </CardContent>
            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    size="small"
                    style={{backgroundColor: '#4caf50'}}
                    variant="contained"
                    fullWidth
                >
                    Applicants
                </Button>
                <Button
                    size="small"
                    style={{backgroundColor: '#2196f3', marginLeft: '8px', marginRight: '8px'}}
                    variant="contained"
                    fullWidth
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    style={{backgroundColor: '#f44336'}}
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
