<template>
    <confirmModal v-if="notifycationActive" message="Lưu thông tin cá nhân?" @close="closeNotifycation"
        @onActive="submit">
    </confirmModal>
    <changePassModal v-if="modalActiveChangePass" @close="toggleModalChangePass" @onActive="changePass($event)">
    </changePassModal>

    <div class="p-3">
        <div>
            <h4 class="text-secondary fw-bold">Thông tin cá nhân:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'personal-page' }">
                    <span> Cá nhân</span>
                </router-link>
            </div>
        </div>

        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <div class="d-flex justify-content-center">
                            <img :src="staff.hinhanh" alt="Avatar" class="w-75 rounded-4">
                        </div>
                        <div class="d-flex justify-content-center form-floating my-2">
                            <input class="w-75 form-control" id="avatar" type="file" @change="previewFiles"
                                ref="avatar">
                            <label for="avatar" style="margin-left:5px;">Thêm avatar:</label>
                            <button class="btn btn-outline-success h-50 ms-2 mt-3" @click="onUpdateAvatar">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="fullname" v-model="staff.hoten">
                                    <label for="fullname">*Họ và tên:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="date" class="form-control" id="dateofbirth" v-model="staff.ngaysinh">
                                    <label for="dateofbirth">*Ngày sinh:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="gender" aria-label="Default select example"
                                        v-model="staff.gioitinh">
                                        <option value="0">Nữ</option>
                                        <option value="1">Nam</option>
                                    </select>
                                    <label for="gender">*Giới tính:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="cccd" v-model="staff.cccd">
                                    <label for="cccd">*Thẻ căn cước:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="bank" v-model="staff.taikhoan">
                                    <label for="bank">*Tài khoản:</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="phone" v-model="staff.sodienthoai">
                                    <label for="phone">*Số điện thoại:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="position" aria-label="Default select example"
                                        v-model="staff.idchucvu">
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
                                    <input type="date" class="form-control" id="startdate" v-model="staff.ngaythamgia">
                                    <label for="startdate">*Ngày vào làm:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select" id="status" aria-label="Default select example"
                                        v-model="staff.trangthai">
                                        <option value="0">Đang làm việc</option>
                                        <option value="1">Đã nghĩ việc</option>
                                    </select>
                                    <label for="status">*Trạng thái:</label>
                                </div>
                                <div class="d-flex mb-2">
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password"
                                            v-model="staff.password" disabled="disabled">
                                        <label for="password">*Mật khẩu: </label>
                                    </div>
                                    <button class="btn btn-outline-secondary h-50 ms-3 mt-3"
                                        @click="toggleModalChangePass">
                                        _<i class="fa-solid fa-pencil"></i></button>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea type="text" class="form-control" id="address" v-model="staff.diachi"
                                    style="height: 100px;"></textarea>
                                <label for="address" class="ms-3">*Nơi cư trú:</label>
                            </div>
                        </div>
                    </div>
                    <span v-if="errorNotifycation" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin nhân
                        viên!
                    </span>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-success ms-3" style="width: 150px;" @click="closeNotifycation">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import staffService from '@/services/staff.service';
import { ref } from 'vue';
import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import changePassModal from '@/components/modalsComponent/changePassModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';

import accountService from '@/services/account.service.js';
export default {
    components: {
        confirmModal, alertMessage, changePassModal
    },

    setup() {
        let notifycationActive = ref(false);
        // Quan li modal cap nhat thong tin tai khoan
        let modalActiveChangePass = ref(false);

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

        const toggleModalChangePass = () => {
            notifycationActive.value = false;
            modalActiveChangePass.value = !modalActiveChangePass.value;
        }

        return {
            notifycationActive, closeNotifycation, showAlert,
            status, messageAlert, errorNotifycation,
            modalActiveChangePass, toggleModalChangePass,
        };
    },

    data() {
        return {
            staff: {},
            fileSelect: null,
        };
    },

    async created() {
        try {
            await this.fetchData();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        async fetchData() {
            this.staff = await staffService.FindOneByToken(this.$store.state.user.token);
            this.staff.password = '11111111';
            this.staff.taikhoan = this.$store.state.user.tendangnhap;
        },

        previewFiles(event) {
            this.fileSelect = event.target.files[0];
        },

        async onUpdateAvatar() {
            const fd = new FormData();
            fd.append('avatar', this.fileSelect);

            try {
                let result = await staffService.UploadAvatar(this.$store.state.user.token, fd);
                if (result.statusCode == 200) {
                    await this.fetchData();
                }
            } catch (error) {
                console.log(error);
            }
        },

        async submit() {
            this.notifycationActive = false // Cloes modal

            //Check info staff is full 
            if (!this.staff.hoten || !this.staff.ngaysinh || !this.staff.cccd
                || !this.staff.sodienthoai || !this.staff.ngaythamgia || !this.staff.diachi) {
                this.errorNotifycation = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'warning';
                this.messageAlert = 'Cập nhật thông tin cá nhân không thành công!';
                this.showAlert = true; // On alert message

            } else {
                try {
                    let dataUpdate = {
                        fullname: this.staff.hoten,
                        dateofbirth: this.staff.ngaysinh,
                        gender: this.staff.gioitinh,
                        idnumber: this.staff.cccd,
                        phone: this.staff.sodienthoai,
                        idposition: this.staff.idchucvu,
                        datestart: this.staff.ngaythamgia,
                        status: this.staff.trangthai,
                        idsalary: this.staff.idluong,
                        address: this.staff.diachi,
                    }
                    await staffService.Update(this.$store.state.user.token, dataUpdate).then((result) => {
                        if (result.statusCode === 200) {
                            this.errorNotifycation = false;
                            this.status = 'success';
                            this.messageAlert = 'Đã cập nhật thông tin cá nhân!';
                            this.showAlert = true; // On alert message
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    this.status = 'danger';
                    this.messageAlert = 'Lỗi trong khi cập nhật thông tin nhân viên!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            }
        },

        async changePass(data) {
            this.modalActiveChangePass = false;
            try {
                await accountService.Update(data.token, data).then(result => {
                    if (result.statusCode == 200) {
                        this.showAlert = true;
                        this.messageAlert = 'Đã cập nhật thông tin tài khoản!';
                        this.status = 'success';
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);

                    }
                })
            } catch (error) {
                console.log(error);
                this.showAlert = true;
                this.messageAlert = 'Lỗi khi cập nhật thông tin tài khoản!';
                this.status = 'danger';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
        },
    }
}
</script>