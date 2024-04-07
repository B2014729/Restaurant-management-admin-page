import createApiClient from "./api.service";

class AccountService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/account") {
        this.api = createApiClient(baseUrl);
    }
    async Login(data) {
        return (await this.api.post('/login', data));
    }

    async CheckPass(token, password) {
        return (await this.api.post(`/check-pass/${token}`, { password })).data;
    }

    async Update(token, dataUpdate) {
        return (await this.api.put(`/${token}`, dataUpdate)).data;
    }
}

export default new AccountService();