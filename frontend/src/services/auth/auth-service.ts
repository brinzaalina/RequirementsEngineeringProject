import axios from "axios";
import { AuthenticationResponse } from "../../models/auth-response";
import { AuthenticationRequest } from "../../models/auth-request";
import { RegisterRequest } from "../../models/register-request";

export const loginUser = (
  authRequest: AuthenticationRequest
): Promise<AuthenticationResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post<AuthenticationResponse>(
        "http://localhost:8080/api/auth/authenticate",
        authRequest
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

export const registerUser = (registerRequest: RegisterRequest, role: string): Promise<AuthenticationResponse> => {
    return new Promise((resolve, reject) => {
        axios
            .post<AuthenticationResponse>(
                "http://localhost:8080/api/auth/register/" + role,
                registerRequest
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
