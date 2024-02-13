import createApiClient from "./api.service";

class BillService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/calendried") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneByPhase(idPhase) {
        return (await this.api.post('/', { idPhase })).data.data[0];
    }

    async GetPhase() {
        return (await this.api.get('/phase')).data.data;
    }

    // async FindAll() {
    //     return (await this.api.get(`/list`)).data.data;
    // }

    // async FindBillWhereTime(start, end) {
    //     return (await this.api.get(`/list/${start}&${end}`)).data.data;
    // }

    // async Create(data) {
    //     return (await this.api.post(`/create`, data)).data;
    // }

    // async Update(id, dataUpdate) {
    //     return (await this.api.put(`/${id}`, dataUpdate)).data;
    // }
}

export default new BillService();
