import createApiClient from "./api.service";

class EvaluateService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/evaluate") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate)).data;
    }
}

export default new EvaluateService();
