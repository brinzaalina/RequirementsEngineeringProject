import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Application } from "../../models/application";
import {
  acceptApplication,
  rejectApplication,
} from "../../services/internship/internship-service";

export const CandidatesPage = () => {
  const { internshipId } = useParams<{ internshipId: string }>();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const role = localStorage.getItem("role")?.toLowerCase();
      if (role !== "recruiter") {
        if (role === "student") {
          navigate("/student/home");
        } else {
          navigate("/authenticate");
        }
      }
    } else {
      navigate("/authenticate");
    }
    if (internshipId) {
      const headers = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      // fetch the list of applications for this internship
      axios
        .get<Application[]>(
          `http://localhost:8080/api/internship/applications/${internshipId}`,
          headers
        )
        .then((response) => {
          console.log(response.data);
          setApplications(response.data);
        })
        .catch((error) => console.error("Error fetching applications", error));
    }
  }, [internshipId, token]);

  const handleAccept = (applicationId: string) => {
    acceptApplication(applicationId)
      .then((response) => {
        console.log(response);
        alert("Accepted application.");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Error accepting application.");
      });
  };

  const handleReject = (applicationId: string) => {
    rejectApplication(applicationId)
      .then((response) => {
        console.log(response);
        alert("Rejected application.");
      })
      .catch((error) => {
        console.error(error);
        alert("Error rejecting application.");
      });
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Internship Candidates
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/recruiter/internships")}
      >
        Back to internships
      </Button>
      {applications.length === 0 && (
        <Typography variant="body1" gutterBottom>
          No candidates yet.
        </Typography>
      )}
      <List>
        {applications.map((application) => (
          <Card
            key={application.applicationId}
            sx={{
              marginTop: 2,
              marginBottom: 2,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "25px",
            }}
          >
            <CardContent>
              <ListItemText
                primary={"Candidate name: " + application.studentName}
              />
              <ListItemText primary={"Status: " + application.status} />
            </CardContent>
            {application.status === "APPLIED" && (
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAccept(application.applicationId)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(application.applicationId)}
                >
                  Reject
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </List>
    </>
  );
};
