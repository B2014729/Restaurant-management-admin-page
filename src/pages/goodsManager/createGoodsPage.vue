<template>
    <div class="p-3">
        <div>
            <h4 class="text-secondary fw-bold">Thêm hàng hóa:</h4>
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
                    :to="{ name: 'create-goods-page' }">
                    <span> / Thêm hàng hóa</span>
                </router-link>
            </div>
        </div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-4 col-12">
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
                                    <input type="text" class="form-control ms-2" id="fullname"
                                        v-model="goods.tenhanghoa">
                                    <label for="fullname" class="custom">
                                        *Tên hàng hóa:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select ms-2" id="salary" aria-label="Default select example"
                                        v-model="goods.idloai">
                                        <option value="2">Nước ngọt</option>
                                        <option value="3">Bia</option>
                                        <option value="8">Hải sản</option>
                                        <option value="9">Thịt tươi</option>
                                        <option value="17">Trái cây tươi</option>
                                        <option value="15">Rau củ</option>
                                        <option value="16">Nấm</option>
                                        <option value="18">Gia vị</option>
                                        <option value="11">Khác</option>
                                    </select>
                                    <label for="salary">*Nhóm hàng hóa:</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="number" class="form-control ms-2" id="phone" v-model="goods.hansudung">
                                    <label for="phone">*Hạn sử dụng (tháng):</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select ms-2" id="salary" aria-label="Default select example"
                                        v-model="goods.iddonvitinh">
                                        <option value="3">Kg</option>
                                        <option value="10">Thùng</option>
                                        <option value="5">Chai</option>
                                        <option value="2">Lon</option>
                                        <option value="9">Gói</option>
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
                        <div class="d-flex justify-content-end mt-2">
                            <span v-if="errorNotifycation" class="text-end text-warning " style="font-size: 14px;">
                                <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin
                                hàng hóa!
                            </span>
                        </div>
                        <div class="d-flex justify-content-end mt-2">
                            <button type="submit" class="btn btn-success" style="width: 150px;" @click="submit">Thêm
                                mới</button> <!--On Modal -->
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import goodsService from '@/services/goods.service';
export default {
    components: {
        alertMessage,
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
            goods: {},
            image: null,
        };
    },


    methods: {
        previewFiles(event) {
            this.image = event.target.files[0];
        },

        async submit() {
            let fd = new FormData();
            if (this.image) {
                fd.append('image', this.image);
            }
            //Check info goods is full 
            if (!this.goods.tenhanghoa || !this.goods.idloai
                || !this.goods.iddonvitinh || !this.goods.mota) {
                this.errorNotifycation = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'warning';
                this.messageAlert = 'Thêm hàng hóa không thành công!';
                this.showAlert = true; // On alert message

            } else {
                try {
                    fd.append('name', this.goods.tenhanghoa);
                    fd.append('expiry', this.goods.hansudung);
                    fd.append('type', this.goods.idloai);
                    fd.append('unit', this.goods.iddonvitinh);
                    fd.append('description', this.goods.mota);

                    await goodsService.Create(fd).then((result) => {
                        if (result.statusCode === 200) {
                            this.errorNotifycation = false;
                            this.status = 'success';
                            this.messageAlert = 'Đã thêm hàng hóa!';
                            this.showAlert = true; // On alert message
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                            this.goods = {};
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.status = 'danger';
                    this.messageAlert = 'Lỗi trong khi thêm hàng hóa!';
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
