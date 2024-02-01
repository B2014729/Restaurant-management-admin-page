<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Lập phiếu chi__:</h4>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <span class="fw-bold">Thông tin hóa đơn:</span>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="staff" v-model="data.staff">
                            <label for="staff">*Nhân viên lập:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" id="createdate" v-model="data.createdate">
                            <label for="createdate">*Ngày lập:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="status" aria-label="Default select example"
                                v-model="data.status">
                                <option value="0">Đã thanh toán</option>
                                <option value="1">Chưa thanh toán</option>
                            </select>
                            <label for="gender">*Trạng thái:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <span class="fw-bold">Thông tin nhà cung cấp:</span>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="supplier" aria-label="Default select example"
                                v-model="data.supplier">
                                <option value="0">Phục vụ</option>
                                <option value="1">Quản lí</option>
                                <option value="0">Phục vụ</option>
                                <option value="1">Quản lí</option>
                                <option value="0">Phục vụ</option>
                                <option value="1">Quản lí</option>
                            </select>
                            <label for="supplier">*Đơn vị cung cấp:</label>
                        </div>

                        <div class="form-floating mb-2">
                            <input type="number" class="form-control" id="payment" v-model="data.payment">
                            <label for="payment">*Tổng thanh toán:</label>
                        </div>
                    </div>
                    <div class="form-floating mb-2">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="fw-bold">Thông tin sản phẩm:</span>
                            <button class="btn btn-outline-secondary" @click="addProductItem()"><i
                                    class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="d-flex" v-for="index in productCount" :key="index">
                            <div class="form-floating mb-2 w-50 ">
                                <select class="form-select" id="status" aria-label="Default select example"
                                    v-model="listProductId[index]">
                                    <option value="0">Đã thanh toán</option>
                                    <option value="1">Chưa thanh toán</option>
                                </select>
                                <label for="gender">*Sản phẩm:</label>
                            </div>
                            <div class="form-floating mb-2 mx-3">
                                <input type="number" class="form-control" id="payment" v-model="listProductQuantity[index]">
                                <label for="payment">*Số lượng:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="payment" v-model="listProductPrice[index]">
                                <label for="payment">*Đơn giá:</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;">Lập phiếu chi</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    setup() {
        let productCount = ref(3);

        const addProductItem = () => {
            productCount.value++;
        }
        return { productCount, addProductItem };
    },
    data() {
        return {
            data: {},
            listProductId: [],
            listProductQuantity: [],
            listProductPrice: [],
        };
    }
}
</script>