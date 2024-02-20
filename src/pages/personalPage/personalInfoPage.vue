<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Thông tin cá nhân__:</h4>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <div class="d-flex justify-content-center">
                            <img src="https://image.phunuonline.com.vn/fckeditor/upload/2022/20220815/images/4176_3-2.jpg"
                                alt="" class="w-75 rounded-4">
                        </div>
                        <div class="d-flex justify-content-center form-floating my-2">
                            <input class=" w-75 form-control" id="avatar" type="file" @change="previewFiles" ref="image">
                            <label for="avatar" style="margin-left:35px;">Thêm avatar:</label>
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="fullname" v-model="data.hoten">
                                    <label for="fullname">*Họ và tên:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="date" class="form-control" id="dateofbirth" v-model="data.ngaysinh">
                                    <label for="dateofbirth">*Ngày sinh:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="gender" aria-label="Default select example"
                                        v-model="data.gioitinh">
                                        <option value="0">Nữ</option>
                                        <option value="1">Nam</option>
                                    </select>
                                    <label for="gender">*Giới tính:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="cccd" v-model="data.cccd">
                                    <label for="cccd">*Thẻ căn cước:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="bank" v-model="data.taikhoan">
                                    <label for="bank">*Tài khoản:</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="phone" v-model="data.sodienthoai">
                                    <label for="phone">*Số điện thoại:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="position" aria-label="Default select example"
                                        v-model="data.idchucvu">
                                        <option value="1">Thu ngân</option>
                                        <option value="2">Phục vụ</option>
                                        <option value="3">Quản lí</option>
                                        <option value="4">Bảo vệ</option>
                                        <option value="5">Bếp trưởng</option>
                                        <option value="6">Bếp phụ</option>
                                    </select>
                                    <label for="position">*Chức vụ:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="date" class="form-control" id="startdate" v-model="data.ngaythamgia">
                                    <label for="startdate">*Ngày vào làm:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="status" aria-label="Default select example"
                                        v-model="data.trangthai">
                                        <option value="0">Đang làm việc</option>
                                        <option value="1">Đã nghĩ việc</option>
                                    </select>
                                    <label for="status">*Trạng thái:</label>
                                </div>
                                <div class="d-flex mb-2">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password" v-model="data.password"
                                            disabled="disabled">
                                        <label for="password">*Mật khẩu: </label>
                                    </div>
                                    <button class="btn btn-outline-secondary h-50 ms-3 mt-3">
                                        _<i class="fa-solid fa-pencil"></i></button>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea type="text" class="form-control" id="address" v-model="data.diachi"
                                    style="height: 100px;"></textarea>
                                <label for="address" class="ms-3">*Nơi cư trú:</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;">Lưu thay đổi</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import staffService from '@/services/staff.service';

export default {

    data() {
        return {
            data: {},
        };
    },

    async created() {
        await this.fetchData();
        this.data.password = 'kkjhssjs';
        this.data.taikhoan = 'haibang';
    },

    methods: {
        async fetchData() {
            this.data = await staffService.FindOneById(2);
        }
    }
}
</script>