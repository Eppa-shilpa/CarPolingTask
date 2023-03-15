const axios = require('axios');

import { ILoginRequest } from "../Interfaces/ILoginRequest";

export class ReportService {
    login(loginRequest: ILoginRequest) {
        return axios.post('/api/security/signin/', loginRequest).then((response: any) => {
            return response.data;
        })
    }

    signup(loginRequest: ILoginRequest) {
        return axios.post('/api/security/signup/', loginRequest).then((response: any) => {
            return response.data;
        })
    }
}