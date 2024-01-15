import axios from "axios";
import { CreateInternship } from "../../models/create-internship-request";
import { Internship } from "../../models/internship-response";

export const createInternship = (internshipRequest: CreateInternship): Promise<Internship>=> {
    return new Promise((resolve, reject) => {
        axios.post<Internship>("http://localhost:8080/api/companies/internships", internshipRequest)
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
