import axios from "axios";
import { CreateInternship } from "../../models/create-internship-request";
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

export const createInternship = (
  internshipRequest: CreateInternship
): Promise<InternshipCompanyDto> => {
  return new Promise((resolve, reject) => {
    axios
      .post<InternshipCompanyDto>(
        "http://localhost:8080/api/companies/internships",
        internshipRequest
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const applyToInternship = (internshipId: string): Promise<string> => {
  console.log(localStorage.getItem("token"));
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  console.log(headers);
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:8080/api/internship/apply/" + internshipId, {},
        headers
      )
      .then((response) => {
        console.log(response);
        resolve("Applied to internship successfully!");
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
