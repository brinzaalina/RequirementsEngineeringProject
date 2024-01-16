import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, Button, Container, Paper, Typography, Divider} from '@mui/material';
import axios from 'axios';
import InternshipCompanyDto from "../../models/InternshipCompanyDto";
import CompanyDto from "../../models/CompanyDto";

const InternshipDetailsPage: React.FC = () => {
    const [internshipDetails, setInternshipDetails] = useState<InternshipCompanyDto | null>(null);
    const [companyDetails, setCompanyDetails] = useState<CompanyDto | null>(null);
    const {internshipId} = useParams<{ internshipId: string }>();

    useEffect(() => {
        if (internshipId
        ) {
            // Fetch the internship details
            axios.get(`http://localhost:8080/api/internships/${internshipId}`)
                .then(response => {
                    setInternshipDetails(response.data);
                    // Now fetch the company details using the companyId from the internship details
                    return axios.get(`http://localhost:8080/api/companies/${response.data.companyId}`);
                })
                .then(response => {
                    setCompanyDetails(response.data);
                })
                .catch(error => console.error('Error fetching details', error));
        }
    }, [internshipId]);

    if (!internshipDetails || !companyDetails) {
        return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Typography>Loading...</Typography>
        </Box>;
    }

    return (
        <Container maxWidth="md" sx={{mt: 4}}>
            <Paper elevation={3} sx={{padding: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {internshipDetails.title}
                </Typography>
                <Divider sx={{mb: 2}}/>

                <Typography variant="h5" gutterBottom>
                    Company
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {companyDetails.companyName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Who we are: {companyDetails.companyDetails}
                </Typography>
                <Divider sx={{my: 2}}/>

                <Typography variant="h5" gutterBottom>
                    Internship Details
                </Typography>


                <Box sx={{mt: 2, mb: 2}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight: 'bold'}}>
                        Location
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 1}}>
                        {internshipDetails.location}
                    </Typography>
                </Box>

                <Box sx={{mt: 2, mb: 2}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight: 'bold'}}>
                        Field
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 1}}>
                        {internshipDetails.field}
                    </Typography>
                </Box>

                <Box sx={{mt: 2, mb: 2}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight: 'bold'}}>
                        Salary
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 1}}>
                        {internshipDetails.salary > 0 ? `${internshipDetails.salary.toLocaleString()} RON` : "Unpaid"}
                    </Typography>
                </Box>

                <Box sx={{mt: 2, mb: 2}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight: 'bold'}}>
                        Positions Available
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 1}}>
                        {internshipDetails.positions}
                    </Typography>
                </Box>

                <Box sx={{mt: 2, mb: 2}}>
                    <Typography variant="subtitle1" component="div" sx={{fontWeight: 'bold'}}>
                        Description
                    </Typography>
                    <Typography variant="body1" component="div" sx={{mt: 1}}>
                        {internshipDetails.description}
                    </Typography>
                </Box>


                <Box sx={{textAlign: 'center', mt: 4}}>
                    <Button variant="contained" color="primary" size="large">
                        Apply to Internship
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default InternshipDetailsPage;