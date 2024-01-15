import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import InternshipCompanyDto from "../../models/InternshipCompanyDto";
import CompanyDto from "../../models/CompanyDto";

const InternshipDetailsPage: React.FC = () => {
    const [internshipDetails, setInternshipDetails] = useState<InternshipCompanyDto | null>(null);
    const [companyDetails, setCompanyDetails] = useState<CompanyDto | null>(null);
    const { internshipId } = useParams<{ internshipId: string }>();

    useEffect(() => {
        if (internshipId) {
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
        return <div>Loading...</div>;
    }

    // Functionality for applying to the internship will be added here later

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {internshipDetails.title}
            </Typography>
            {/* Display company details */}
            <Typography variant="h6">
                Company: {companyDetails.companyName}
            </Typography>
            <Typography variant="subtitle1">
                {companyDetails.companyDetails}
            </Typography>
            {/* Add more sections for each piece of internship information */}
            <Typography variant="body1">
                Description: {internshipDetails.description}
            </Typography>
            {/* ...other details like location, field, salary... */}
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Button variant="contained" color="primary">
                    Apply to Internship
                </Button>
            </Box>
        </Paper>
    );
};

export default InternshipDetailsPage;
