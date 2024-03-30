import createApiClient from "./api.service";

class CustomerService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/customer") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(idCustomer) {
        return (await this.api.get(`/${idCustomer}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }
}
export default new CustomerService();