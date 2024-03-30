import createApiClient from "./api.service";

class DepotService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/depot") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Update(listId, listQuantity) {
        return (await this.api.put('/update', { listId: listId, listQuantity: listQuantity })).data;
    }

}

export default new DepotService();
