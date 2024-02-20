<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Lập phiếu chi__:</h4>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <span class="fw-bold">Thông tin hóa đơn:</span>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="staff" v-model="data.staff" disabled>
                            <label for="staff">*Nhân viên lập:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" id="createdate" v-model="data.createdate">
                            <label for="createdate">*Ngày lập:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="status" aria-label="Default select example"
                                v-model="data.status">
                                <option value="1">Đã thanh toán</option>
                                <option value="0">Chưa thanh toán</option>
                            </select>
                            <label for="status">*Trạng thái:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <span class="fw-bold">Thông tin nhà cung cấp:</span>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="supplier" aria-label="Default select example"
                                v-model="data.idSupplier">
                                <option v-for="(item, i)  in listSupplierFromSelect" :key="i" :value="item.idnhacungcap">{{
                                    item.tennhacungcap }}
                                </option>
                            </select>
                            <label for="supplier">*Đơn vị cung cấp:</label>
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
                                <select class="form-select" id="product" aria-label="Default select example"
                                    v-model="listProductId[index - 1]">
                                    <option v-for="(product, i) in lisProductFromSelect" :key="i"
                                        :value="product.idhanghoa">
                                        {{ product.tenhanghoa }}
                                    </option>
                                </select>
                                <label for="product">*Sản phẩm:</label>
                            </div>
                            <div class="form-floating mb-2 mx-3">
                                <input type="number" class="form-control" id="payment"
                                    v-model="listProductQuantity[index - 1]">
                                <label for="payment">*Số lượng:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="price" v-model="listProductPrice[index - 1]">
                                <label for="price">*Đơn giá:</label>
                            </div>
                        </div>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin phiếu chi!
                    </span>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;" @click="submit">
                            Lập phiếu chi
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { ref } from 'vue';

import supplierService from '@/services/supplier.service';
import productService from '@/services/product.service'

import alertMessage from '@/components/alertMessage/alertMessage.vue';
import paymentService from '@/services/payment.service';

export default {
    components: {
        alertMessage,
    },

    setup() {
        let productCount = ref(1);
        let showAlert = ref(false);
        let errorNotifycation = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        const addProductItem = () => {
            productCount.value++;
        }


        return { productCount, addProductItem, showAlert, status, messageAlert, errorNotifycation };
    },

    data() {
        return {
            data: {},
            listSupplierFromSelect: [],
            lisProductFromSelect: [],
            listProductId: [],
            listProductQuantity: [],
            listProductPrice: [],
        };
    },

    async created() {
        await this.fetchData();
        this.data.staff = 'Duong Hai Bang';
        this.data.createdate = moment(new Date()).format('YYYY-MM-DD');
    },

    methods: {
        async fetchData() {
            this.listSupplierFromSelect = await supplierService.FindAll();
            this.lisProductFromSelect = await productService.FindAll();
        },

        async submit() {
            if (!this.data.createdate || !this.data.status || !this.data.idSupplier ||
                this.listProductId.length <= 0 || this.listProductId.length !== this.listProductPrice.length || this.listProductId.length !== this.listProductQuantity.length) {
                this.errorNotifycation = true;
                this.messageAlert = 'Lập phiếu chi không thành công!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
            else {
                this.errorNotifycation = false;
                let formData = {
                    idStaff: 2,
                    idSupplier: this.data.idSupplier,
                    time: this.data.createdate,
                    status: this.data.status,
                    idGoods: this.listProductId,
                    quantity: this.listProductQuantity,
                    price: this.listProductPrice,
                };
                console.log(formData);
                try {
                    await paymentService.Create(formData).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Lập phiếu chi thành công!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Lỗi trong khi lập phiếu chi!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.messageAlert = 'Lỗi trong khi thêm nhân viên!';
                    this.status = 'danger';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            }
        },
    },
}
</script>