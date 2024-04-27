<template>
    <div>
        <confirmModal v-if="notifycationActive" message="Lưu thông tin hàng hóa?" @close="closeNotifycation"
            @onActive="submit">
        </confirmModal>
        <div class="p-3">
            <div>
                <h4 class="text-secondary fw-bold">Cập nhật thông tin hang hóa:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'home-page' }">
                        <span>Trang chủ</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'depot-page' }">
                        <span> / Quản lí kho</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'goods-page' }">
                        <span> / Danh sách hàng hóa</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'update-goods-page' }">
                        <span> / Cập nhật hàng hóa</span>
                    </router-link>
                </div>
            </div>
            <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

            <div class="d-flex justify-content-center">
                <form class="w-75" @submit.prevent="{ }">
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <div class="d-flex justify-content-center">
                                <img :src="goods.hinhanh" alt="Avatar" class="w-75 rounded-4">
                            </div>
                            <div class="d-flex justify-content-center form-floating my-2">
                                <input class=" w-75 form-control" id="avatar" type="file" @change="previewFiles"
                                    ref="image">
                                <label for="avatar" style="margin-left:35px;">Thêm ảnh:</label>
                            </div>
                        </div>
                        <div class="col-md-8 col-12">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control  ms-2" id="fullname"
                                            v-model="goods.tenhanghoa">
                                        <label for="fullname" :class="{ custom: notifycationActive }">
                                            *Tên hàng hóa:</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="salary" aria-label="Default select example"
                                            v-model="goods.idloai">
                                            <option value="2">Nước ngọt</option>
                                            <option value="3">Bia</option>
                                            <option value="8">Hải sản</option>
                                            <option value="9">Thịt tươi</option>
                                            <option value="15">Rau củ</option>
                                        </select>
                                        <label for="salary">*Nhóm hàng hóa:</label>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-floating mb-2">
                                        <input type="number" class="form-control ms-2" id="phone"
                                            v-model="goods.hansudung">
                                        <label for="phone">*Hạn sử dụng (tháng):</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="salary" aria-label="Default select example"
                                            v-model="goods.iddonvitinh">
                                            <option value="3">Kg</option>
                                            <option value="10">Thùng</option>
                                            <option value="5">Chai</option>
                                            <option value="2">Lon</option>
                                        </select>
                                        <label for="salary">*Đơn vị tính:</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea type="text" class="form-control ms-2" id="address" v-model="goods.mota"
                                    style="height: 100px;"></textarea>
                                <label for="address">*Mô tả chi tiết:</label>
                            </div>
                            <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                                <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin nhân
                                viên!
                            </span>
                            <div class="d-flex justify-content-end mt-2">
                                <button type="submit" class="btn btn-success" style="width: 150px;"
                                    @click="closeNotifycation">Cập nhật</button> <!--On Modal -->
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import goodsService from '@/services/goods.service';
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

        const closeNotifycation = () => {
            notifycationActive.value = !notifycationActive.value;
            if (notifycationActive.value === false) {
                showAlert.value = true;
                setTimeout(() => {
                    showAlert.value = false;
                }, 2500);
                status.value = 'danger';
                messageAlert.value = 'Đã hủy thông tin cập nhật!';
            }
        }

        return { notifycationActive, closeNotifycation, showAlert, status, messageAlert, errorNotifycation };
    },


    data() {
        return {
            goods: {},
            image: null,
        };
    },

    async created() {
        await this.fetchData();
    },


    methods: {
        async fetchData() {
            try {
                this.goods = await goodsService.FindOneById(this.id);
            } catch (error) {
                console.log(error);
            }
        },

        previewFiles(event) {
            this.image = event.target.files[0];
        },

        async submit() {
            this.notifycationActive = false // Cloes Modal
            let fd = new FormData();
            if (this.image) {
                fd.append('image', this.image);
            }
            //Check info goods is full 
            if (!this.goods.tenhanghoa || !this.goods.hansudung || !this.goods.idloai
                || !this.goods.iddonvitinh || !this.goods.mota) {
                this.errorNotifycation = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'warning';
                this.messageAlert = 'Cập nhật thông tin hàng hóa không thành công!';
                this.showAlert = true; // On alert message

            } else {
                try {
                    fd.append('name', this.goods.tenhanghoa);
                    fd.append('expiry', this.goods.hansudung);
                    fd.append('type', this.goods.idloai);
                    fd.append('unit', this.goods.iddonvitinh);
                    fd.append('description', this.goods.mota);

                    let result = await goodsService.Update(this.id, fd);
                    if (result.statusCode === 200) {
                        await this.fetchData();
                        this.errorNotifycation = false;
                        this.status = 'success';
                        this.messageAlert = 'Đã cập nhật thông tin hàng hóa!';
                        this.showAlert = true; // On alert message
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    }

                } catch (error) {
                    console.log(error);
                    this.status = 'danger';
                    this.messageAlert = 'Lỗi trong khi cập nhật thông tin hàng hóa!';
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

<style scoped></style>
