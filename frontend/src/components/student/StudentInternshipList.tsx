import React from 'react';
import {Box, Pagination} from '@mui/material';
import StudentMinimalInternshipCard from './StudentMinimalInternshipCard';
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

interface InternshipListProps {
    internships: InternshipCompanyDto[];
    totalPageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const StudentInternshipList: React.FC<InternshipListProps> = ({
                                                           internships,
                                                           totalPageCount,
                                                           currentPage,
                                                           onPageChange
                                                       }) => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {internships.map(internship => (
                <StudentMinimalInternshipCard key={internship.internshipId} internship={internship}/>
            ))}
            <Pagination
                count={totalPageCount}
                page={currentPage}
                onChange={(event, page) => onPageChange(page)}
                sx={{marginY: 4}}
            />
        </Box>
    );
};

export default StudentInternshipList;
