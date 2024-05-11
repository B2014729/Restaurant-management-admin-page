<template>
    <div class="p-3">
        <confirmModal v-if="notifycationActive" message="Lưu thông tin nhà cung cấp ?" @close="closeNotifycation"
            @onActive="submit">
        </confirmModal>

        <div>
            <h4 class="text-secondary fw-bold">Cập nhật thông tin nhà cung cấp:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'supplier-page' }">
                    <span>Danh sách nhà cung cấp</span>
                </router-link>
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'update-supplier-page' }">
                    <span> / Cập nhật nhà cung cấp</span>
                </router-link>
            </div>
        </div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="fullname" v-model="supplier.tennhacungcap">
                            <label for="fullname">*Tên nhà cung cấp:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="phone" v-model="supplier.sodienthoai"
                                ref="phoneNumber">
                            <label for="phone">*Số điện thoại:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="bank" v-model="supplier.sotaikhoan">
                            <label for="bank">*Số tài khoản:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="bankName" aria-label="Default select example"
                                v-model="supplier.nganhang">
                                <option value="MB Bank">MB Bank</option>
                                <option value="Viettinbank">VietTinbank</option>
                                <option value="Agribank">Agribank</option>
                                <option value="BIDV">BIDV</option>
                                <option value="Saccombank">Saccombank</option>
                            </select>
                            <label for="bankName">*Ngân hàng:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <textarea type="text" class="form-control" id="address" v-model="supplier.diachi"
                                style="height: 190px;">
                            </textarea>
                            <label for="address">*Địa chỉ:</label>
                        </div>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> {{ messageError }}
                    </span>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;"
                            @click="closeNotifycation">Cập nhật
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import supplierService from '@/services/supplier.service';
export default {
    components: {
        confirmModal,
        alertMessage,
    },

    props: {
        id: {
            type: String,
        }
    },

    setup() {
        let notifycationActive = ref(false);

        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');
        let errorNotifycation = ref(false);
        let messageError = ref('');

        const closeNotifycation = () => {
            notifycationActive.value = !notifycationActive.value;
            if (notifycationActive.value === false) {
                showAlert.value = true;
                status.value = 'danger';
                messageAlert.value = 'Đã hủy yêu cầu cập nhật!';
                setTimeout(() => {
                    showAlert.value = false;
                }, 2500);

            }
        }

        return {
            notifycationActive, closeNotifycation, showAlert, status,
            messageAlert, errorNotifycation, messageError
        };
    },

    data() {
        return {
            supplier: {},
        };
    },

    async created() {
        this.supplier = await supplierService.FindOneById(this.id);
    },

    methods: {
        checkPhoneNumber(phoneNumber) {
            return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phoneNumber);
        },

        async submit() {
            this.notifycationActive = false // Cloes Modal
            //Check info staff is full 
            if (!this.supplier.tennhacungcap || !this.supplier.diachi || !this.supplier.sodienthoai
                || !this.supplier.sotaikhoan || !this.supplier.nganhang) {
                this.errorNotifycation = true;
                this.messageError = 'Vui lòng chọn đầy đủ thông tin nhà cung cấp!';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'warning';
                this.messageAlert = 'Cập nhật thông tin nhân viên không thành công!';
                this.showAlert = true; // On alert message
            } else if (!this.checkPhoneNumber(this.supplier.sodienthoai)) {
                this.errorNotifycation = true;
                this.messageError = 'Số điện thoại không đúng, vui lòng nhập lại số điện thoại!';
                this.$refs.phoneNumber.focus();
            } else {
                try {
                    let dataUpdate = {
                        name: this.supplier.tennhacungcap,
                        phone: this.supplier.sodienthoai,
                        address: this.supplier.diachi,
                        bank: this.supplier.sotaikhoan,
                        bankName: this.supplier.nganhang,
                    };

                    await supplierService.Update(this.id, dataUpdate).then((result) => {
                        if (result.statusCode === 200) {
                            this.errorNotifycation = false;

                            this.status = 'success';
                            this.messageAlert = 'Đã cập nhật thông tin nhà cung cấp!';
                            this.showAlert = true; // On alert message
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.status = 'danger';
                    this.messageAlert = 'Lỗi trong khi cập nhật thông tin nhà cung cấp!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            }
        },
    }
}
</script>