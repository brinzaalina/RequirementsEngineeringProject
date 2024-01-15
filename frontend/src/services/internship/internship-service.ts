import axios from "axios";
import { CreateInternship } from "../../models/create-internship-request";
import InternshipCompanyDto from "../../models/InternshipCompanyDto";

export const createInternship = (internshipRequest: CreateInternship): Promise<InternshipCompanyDto>=> {
    return new Promise((resolve, reject) => {
        axios.post<InternshipCompanyDto>("http://localhost:8080/api/companies/internships", internshipRequest)
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
