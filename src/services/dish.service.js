import createApiClient from "./api.service";

class DishService {
    constructor(baseUrl = "http://localhost:8000/api/v1/restaurant-management-system/dish") {
        this.api = createApiClient(baseUrl);
    }

    async FindOneById(id) {
        return (await this.api.get(`/${id}`)).data.data[0];
    }

    async FindAll() {
        return (await this.api.get(`/list-on-type`)).data.data;
    }

    // async FindBillWhereTime(start, end) {
    //     return (await this.api.get(`/list/${start}&${end}`)).data.data;
    // }

    async Create(data) {
        return (await this.api.post(`/create`, data)).data;
    }

    async Update(id, dataUpdate) {
        return (await this.api.put(`/${id}`, dataUpdate)).data;
    }

    async Delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    //Menu manager
    async GetMenu() {
        return (await this.api.get(`/menu`)).data.data;
    }

    async AddDishOnMenu(idDish) {
        return (await this.api.post(`/menu/add`, { idDish })).data;
    }

    async DeleteOutMenu(idDish) {
        return (await this.api.delete(`/menu/${idDish}`)).data;
    }

    async GetLishDishSellALot() {
        return (await this.api.get('/list-sell-a-lot')).data.data;
    }

    async GetStatisticalOnDishSell() {
        return (await this.api.get('/statistical-dish-sell')).data.data;
    }
}

export default new DishService();
