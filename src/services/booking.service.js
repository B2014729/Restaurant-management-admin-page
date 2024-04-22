import createApiClient from "./api.service";

class BookingService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/bookings") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async Confirm(id, status, idTable) {
        return (await this.api.put(`/confirm/${id}`, {
            status: status,
            idTable: idTable,
        })).data;
    }

}

export default new BookingService();