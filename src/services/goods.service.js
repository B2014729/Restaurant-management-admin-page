import createApiClient from "./api.service";

class GoodsService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/goods") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Create(data) {
        console.log(data)
        return (await this.api.post(`/create`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })).data;
    }

    async Delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new GoodsService();
