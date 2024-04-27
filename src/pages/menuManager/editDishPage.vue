<template>
    <div class="p-3">
        <confirmModal v-if="notifycationActive" message="Lưu thông tin món ăn?" @close="closeNotifycation"
            @onActive="submit">
        </confirmModal>
        <div>
            <h4 class="text-secondary fw-bold">Cập nhật thông tin món ăn:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'list-dish-page' }">
                    <span>Danh sách món ăn</span>
                </router-link>
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'update-dish-page' }">
                    <span> / Cập nhật món ăn</span>
                </router-link>
            </div>
        </div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <div class="d-flex justify-content-center">
                            <img :src="data.hinhanh" alt="Ảnh món" class="w-75 rounded-4">
                        </div>
                        <div class="d-flex justify-content-center form-floating my-2">
                            <input class="w-75 form-control" id="avatar" type="file" @change="previewFiles" ref="image">
                            <label for="avatar" style="margin-left:35px;">Thêm hình ảnh:</label>
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="tenmon" v-model="data.tenmon">
                                    <label for="tenmon">*Tên món:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select ps-3" id="type" aria-label="Default select example"
                                        v-model="data.idloai">
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
                                    <input type="number" class="form-control" id="price" v-model="data.gia">
                                    <label for="price">*Giá bán (vnđ /{{ data.donvitinh }}):</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select ps-3" id="position" aria-label="Default select example"
                                        v-model="data.iddonvitinh">
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
                                    <select class="form-select ps-3" id="status" aria-label="Default select example"
                                        v-model="data.trangthai">
                                        <option value="0">Nghĩ bán</option>
                                        <option value="1">Còn bán</option>
                                    </select>
                                    <label for="status">*Trạng thái:</label>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea type="text" class="form-control" id="note" v-model="data.ghichu"
                                    style="height: 100px;"></textarea>
                                <label for="note" class="ms-3">*Ghi chú:</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;"
                            @click="closeNotifycation">Cập
                            nhật</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import dishService from '@/services/dish.service';

import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
export default {
    components: {
        confirmModal, alertMessage
    },

    props: {
        id: {
            type: String
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
            data: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            this.data = await dishService.FindOneById(this.id);
        },

        async submit() {
            this.notifycationActive = false;
            if (!this.data.tenmon || !this.data.idloai || !this.data.iddonvitinh || !this.data.gia || !this.data.trangthai) {
                this.errorNotifycation = true;
                this.messageAlert = 'Cập nhật thông tin món không thành công!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            } else {
                this.errorNotifycation = false;
                try {
                    let dataUpdate = {
                        name: this.data.tenmon,
                        status: this.data.trangthai,
                        unit: this.data.iddonvitinh,
                        type: this.data.idloai,
                        price: this.data.gia,
                    };

                    await dishService.Update(this.id, dataUpdate).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Đã cập nhật thông tin món ăn!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Lỗi khi cập nhật thông tin món ăn!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    });
                } catch (error) {
                    this.messageAlert = 'Lỗi khi cập nhật thông tin món ăn!';
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