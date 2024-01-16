import axios from "axios";
import CompanyDto from "../../models/CompanyDto";

export const editCompany = (
  companyRequest: CompanyDto
): Promise<CompanyDto> => {
  console.log(companyRequest);
  return new Promise((resolve, reject) => {
    axios
      .put<CompanyDto>(
        "http://localhost:8080/api/companies/" + companyRequest.companyId,
        companyRequest
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
