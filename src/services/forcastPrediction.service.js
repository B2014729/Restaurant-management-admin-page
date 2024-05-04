import createApiClient from "./api.service";

class PromotionService {
    constructor(baseUrl = "http://localhost:5000") {
        this.api = createApiClient(baseUrl);
    }

    async Forcast(dataForcast) {
        return (await this.api.post(`/forcast`, dataForcast)).data;
    }
}

export default new PromotionService();