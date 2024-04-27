<template>
    <div class="p-3">
        <div>
            <h4 class="text-secondary fw-bold">Thêm mới nhân viên:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'list-staff-page' }">
                    <span>Danh sách nhân viên</span>
                </router-link>
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'create-staff-page' }">
                    <span> / Thêm nhân viên</span>
                </router-link>
            </div>
        </div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="fullname" v-model="data.fullname">
                            <label for="fullname">*Họ và tên:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" id="dateofbirth" v-model="data.dateofbirth">
                            <label for="dateofbirth">*Ngày sinh:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="gender" aria-label="Default select example"
                                v-model="data.gender">
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                            <label for="gender">*Giới tính:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="number" class="form-control" id="cccd" v-model="data.idnumber">
                            <label for="cccd">*Thẻ căn cước:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="phone" v-model="data.phone">
                            <label for="phone">*Số điện thoại:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <select class="form-select" id="position" aria-label="Default select example"
                                v-model="data.idposition">
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
                            <select class="form-select" id="salary" aria-label="Default select example"
                                v-model="data.idsalary">
                                <option value="1">18,000/h</option>
                                <option value="2">26,000/h</option>
                                <option value="3">30,000/h</option>
                                <option value="4">45,000/h</option>
                            </select>
                            <label for="salary">*Hệ số lương:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="date" class="form-control" id="startdate" v-model="data.datestart">
                            <label for="startdate">*Ngày vào làm:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="status" aria-label="Default select example"
                                v-model="data.status">
                                <option value="1">Đang làm việc</option>
                                <option value="0">Đã nghĩ việc</option>
                            </select>
                            <label for="status">*Trạng thái:</label>
                        </div>
                        <div class="d-flex form-floating my-2">
                            <input class="form-control" id="avatar" type="file" @change="previewFiles" ref="image">
                            <label for="avatar" style="margin: -5px;">Thêm avatar:</label>
                        </div>
                    </div>
                    <div class="form-floating mb-2">
                        <textarea type="text" class="form-control" id="address" v-model="data.address"
                            style="height: 100px;"></textarea>
                        <label for="address" class="ms-3">*Nơi cư trú:</label>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin nhân viên!
                    </span>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;" @click="submit">
                            Thêm nhân viên
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import staffService from '@/services/staff.service';
export default {

    components: {
        alertMessage
    },

    setup() {
        let showAlert = ref(false);
        let errorNotifycation = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        return {
            showAlert, status, messageAlert, errorNotifycation
        };
    },

    data() {
        return {
            data: {},
            fileSelect: null,
        };
    },

    methods: {
        previewFiles(event) {
            this.fileSelect = event.target.files[0];
        },

        async submit() {
            if (!this.data.fullname || !this.data.dateofbirth || !this.data.datestart
                || !this.data.phone || !this.data.idnumber || !this.data.address
                || !this.data.idsalary || !this.data.idposition || !this.data.gender
                || !this.data.status) {

                this.errorNotifycation = true;
                this.messageAlert = 'Thêm nhân viên mới không thành công!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
            else {
                this.errorNotifycation = false;
                try {
                    const fd = new FormData();
                    fd.append('avatar', this.fileSelect);
                    fd.append('fullname', this.data.fullname);
                    fd.append('dateofbirth', this.data.dateofbirth);
                    fd.append('datestart', this.data.datestart);
                    fd.append('phone', this.data.phone);
                    fd.append('idnumber', this.data.idnumber);
                    fd.append('address', this.data.address);
                    fd.append('idsalary', this.data.idsalary);
                    fd.append('idposition', this.data.idposition);
                    fd.append('gender', this.data.gender);
                    fd.append('status', this.data.status);

                    await staffService.Create(fd).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Thêm nhân viên mới thành công!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        } else {
                            this.messageAlert = 'Lỗi trong khi thêm nhân viên!';
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

    }
}
</script>

<style scoped></style>