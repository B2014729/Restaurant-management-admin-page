import createApiClient from "./api.service";

class BillService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/payment") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    // async FindBillWhereTime(start, end) {
    //     return (await this.api.get(`/list/${start}&${end}`)).data.data;
    // }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }

    // async Update(id, dataUpdate) {
    //     return (await this.api.put(`/${id}`, dataUpdate)).data;
    // }

    async GetStatistical(year) {
        return (await this.api.get(`/statistical/${year}`)).data.data;
    }

    async getPaymentWhereTime(start, end) {
        return (await this.api.get(`/list-in-time/${start}&${end}`)).data.data;
    }
}

export default new BillService();
