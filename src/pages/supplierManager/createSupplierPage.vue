<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Thêm mới nhà cung cấp__:</h4>

        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="fullname" v-model="data.name">
                            <label for="fullname">*Tên nhà cung cấp:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="phone" v-model="data.phone">
                            <label for="phone">*Số điện thoại:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="bank" v-model="data.bank">
                            <label for="bank">*Số tài khoản:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="bankName" aria-label="Default select example"
                                v-model="data.bankName">
                                <option value="MB Bank">MB Bank</option>
                                <option value="Vie  ttinbank">VietTinbank</option>
                                <option value="Agribank">Agribank</option>
                                <option value="BIDV">BIDV</option>
                                <option value="Saccombank">Saccombank</option>
                            </select>
                            <label for="bankName">*Ngân hàng:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <textarea type="text" class="form-control" id="address" v-model="data.address"
                                style="height: 190px;">
                            </textarea>
                            <label for="address">*Địa chỉ:</label>
                        </div>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin nhà cung cấp!
                    </span>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;"
                            @click="toggleShowAlert">Thêm NCC</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import alertMessage from '@/components/alertMessage/alertMessage.vue';
import supplierService from '@/services/supplier.service';
export default {
    components: {
        alertMessage,
    },

    props: {
        id: {
            type: String,
        }
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');
        let errorNotifycation = ref(false);

        return { showAlert, status, messageAlert, errorNotifycation };
    },

    data() {
        return {
            data: {},
        };
    },


    methods: {
        async toggleShowAlert() {
            if (!this.data.name || !this.data.address || !this.data.phone
                || !this.data.bank || !this.data.bankName) {

                this.errorNotifycation = true;
                this.messageAlert = 'Thêm nhà cung cấp không thành công!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
            else {
                this.errorNotifycation = false;
                try {
                    await supplierService.Create(this.data).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Thêm nhà cung cấp mới thành công!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Lỗi trong khi thêm nhà cung cấp!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.messageAlert = 'Lỗi trong khi thêm nhà cung cấp!';
                    this.status = 'danger';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            }
        },
    }
}
</script>