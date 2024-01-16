import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

interface Company {
  companyId: string;
  companyName: string;
  companyDetails: string;
}

interface StudentMinimalInternshipCardProps {
  internship: InternshipCompanyDto;
}

const StudentMinimalInternshipCard: React.FC<
  StudentMinimalInternshipCardProps
> = ({ internship }) => {
  const [companyName, setCompanyName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the company name using the companyId from the internship
    axios
      .get(`http://localhost:8080/api/companies/${internship.companyId}`)
      .then((response) => {
        const company: Company = response.data;
        setCompanyName(company.companyName);
      })
      .catch((error) => {
        console.error("Error fetching company details", error);
      });
  }, [internship.companyId]);

  const handleViewDetails = () => {
    navigate(`/internship-details/${internship.internshipId}`);
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2, textAlign: "left" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          {internship.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          From {companyName || "Loading company..."}
        </Typography>
        <Typography variant="body2">Location: {internship.location}</Typography>
        <Typography variant="body2">Field: {internship.field}</Typography>
        <Typography variant="body2">
          Salary:{" "}
          {internship.salary > 0
            ? `${internship.salary.toLocaleString()} RON`
            : "Unpaid"}
        </Typography>
        <Typography variant="body2">
          Positions Available: {internship.positions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleViewDetails}
          sx={{
            borderRadius: 5,
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default StudentMinimalInternshipCard;
