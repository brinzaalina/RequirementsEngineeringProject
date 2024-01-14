import React, { useState, useEffect } from 'react';
import { Pagination, Box } from '@mui/material';
import axios from 'axios';
import InternshipCard from './InternshipCard';
import Internship from "../model/Internship";

const InternshipList: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const companyId = "0b7b2efd-e98e-4bd8-bb2f-1310e3c4a889"; // localStorage.getItem('companyId');
        axios.get(`http://localhost:8080/api/companies/internships/all/${companyId}?page=${page - 1}&size=2`)
            .then(response => {
                setInternships(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching internships', error));
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Pagination count={totalPages} page={page} onChange={handlePageChange} sx={{ marginBottom: 2 }} />
            {internships.map((internship) => (
                <Box key={internship.internshipId} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <InternshipCard internship={internship} />
                </Box>
            ))}
            <Pagination count={totalPages} page={page} onChange={handlePageChange} sx={{ marginTop: 2 }} />
        </Box>
    );
};

export default InternshipList;
