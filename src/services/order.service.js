import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/order-dish") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list`)).data.data;
    }

    async FindAllDishPaidInDate(date) {
        return (await this.api.get(`/list-dish-paid/date/${date}`)).data.data;
    }

    async Create(data) {
        return (await this.api.post('/create', data)).data;
    }

    async GetOrderNotSendKitChen(date) {   //Lay danh sach order chua gui cho bep trong 1 ngay (date = '2024-04-04')
        return (await this.api.get(`/list/date/${date}`)).data.data;
    }

    async SendToKitchen(id) {
        return (await this.api.put(`/update-send-to-kitchen/${id}`)).data;
    }

    async DishPaid(idorder, iddish, idcomnbo, token) {
        return (await this.api.put(`/dish-paid/${idorder}`, {
            idDish: iddish,
            idCombo: idcomnbo,
            token: token,
        })).data;
    }
}

export default new OrderService();
