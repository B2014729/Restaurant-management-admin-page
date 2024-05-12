import createApiClient from "./api.service";

class RevenueService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/dataset_revenue") {
        this.api = createApiClient(baseUrl);
    }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }
}

export default new RevenueService()