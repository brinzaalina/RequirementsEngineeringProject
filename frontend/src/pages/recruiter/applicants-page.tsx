import { useNavigate, useParams } from "react-router-dom";
import { Application } from "../../models/application";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  acceptApplication,
  rejectApplication,
} from "../../services/internship/internship-service";

export const CandidatesPage = () => {
  const { internshipId } = useParams<{ internshipId: string }>();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
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
  }, [internshipId]);

  const handleAccept = (applicationId: string) => {
    acceptApplication(applicationId)
      .then((response) => {
        console.log(response);
        alert("Accepted application.");
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
      <List>
        {applications.map((application) => (
          <ListItem key={application.applicationId}>
            <ListItemText primary={application.studentName} />
            <ListItemText primary={application.status} />
            {application.status === "APPLIED" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(application.applicationId)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleReject(application.applicationId)}
                >
                  Reject
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
};
