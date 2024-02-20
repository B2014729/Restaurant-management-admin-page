import createApiClient from "./api.service";

class BillService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/calendrier") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneByPhase(idPhase) {
        return (await this.api.get(`/${idPhase}`)).data.data[0];
    }

    async GetPhase() {
        return (await this.api.get('/phase')).data.data;
    }

    async FindOneArrangeByPhase(idPhase) {
        return (await this.api.get(`/arrange/${idPhase}`)).data.data[0];
    }

    async CreatePhase(startdate, enddate) {
        return (await this.api.post(`/phase/create`, { startdate, enddate })).data;
    }

    async CreateWorkCalendrier(data) {
        return (await this.api.post(`/arrange/create`, { workWeek: data })).data;
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
