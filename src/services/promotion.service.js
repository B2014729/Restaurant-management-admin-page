import createApiClient from "./api.service";

class PromotionService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/promotion") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data;
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Create(data) {
        return (await this.api.post(`/create`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate)).data;
    }

    async Delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async UploadBanner(id, data) {
        return (await this.api.put(`/upload-banner/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })).data;
    }
}

export default new PromotionService();