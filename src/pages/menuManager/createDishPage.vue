<template>
    <div class="p-3">
        <div>
            <h4 class="text-secondary fw-bold">Thêm mới món ăn:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'list-dish-page' }">
                    <span>Danh sách món ăn</span>
                </router-link>
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'create-dish-page' }">
                    <span> / Thêm món ăn</span>
                </router-link>
            </div>
        </div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="name" v-model="data.name">
                            <label for="name">*Tên món:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select ps-3" id="type" aria-label="Default select example"
                                v-model="data.type">
                                <option value="2">Nước ngọt</option>
                                <option value="3">Bia</option>
                                <option value="4">Lẩu</option>
                                <option value="5">Tráng miệng</option>
                                <option value="6">Khai vị</option>
                                <option value="7">Nướng</option>
                                <option value="8">Hải sản</option>
                                <option value="9">Thịt tươi</option>
                                <option value="10">Gỏi</option>
                                <option value="13">Thêm</option>
                            </select>
                            <label for="type">*Loại danh mục:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <select class="form-select ps-3" id="position" aria-label="Default select example"
                                v-model="data.unit">
                                <option value="1">Cái</option>
                                <option value="2">Lon</option>
                                <option value="3">Kg</option>
                                <option value="4">Dĩa</option>
                                <option value="5">Chai</option>
                                <option value="7">Bát</option>
                                <option value="8">Phần</option>
                                <option value="9">Gói</option>
                            </select>
                            <label for="position">*Đơn vị tính:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="number" class="form-control" id="price" v-model="data.price">
                            <label for="price">*Giá bán (vnđ/Dv tính):</label>
                        </div>
                        <div class="d-flex form-floating my-2">
                            <input class="form-control" id="avatar" type="file" @change="previewFiles" ref="image">
                            <label for="avatar" style="margin: -5px;">Thêm hình ảnh:</label>
                        </div>
                    </div>
                    <div class="form-floating mb-2">
                        <textarea type="text" class="form-control" id="note" v-model="data.note"
                            style="height: 100px;"></textarea>
                        <label for="note" class="ms-3">*Ghi chú:</label>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin món ăn!
                    </span>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;" @click="DishAdd">Thêm
                            món</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import alertMessage from '@/components/alertMessage/alertMessage.vue';

import dishService from '@/services/dish.service.js';
export default {
    components: {
        alertMessage,
    },

    setup() {
        let showAlert = ref(false);
        let errorNotifycation = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        return { showAlert, status, messageAlert, errorNotifycation };
    },

    data() {
        return {
            data: {},
        };
    },

    methods: {
        async DishAdd() {
            if (!this.data.name || !this.data.type || !this.data.unit || !this.data.price) {
                this.errorNotifycation = true;
                this.messageAlert = 'Thêm mới món không thành công!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            } else {
                this.errorNotifycation = false;
                try {
                    await dishService.Create(this.data).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Đã thêm món ăn mới!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Lỗi khi thêm mới món ăn!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    });
                } catch (error) {
                    this.messageAlert = 'Lỗi khi thêm mới món ăn!';
                    this.status = 'danger';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                    console.log(error);
                }
            }
        }
    }
}
</script>