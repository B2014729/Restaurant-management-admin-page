<template>
    <div>
        <confirmModal v-if="notifycationActive" message="Lưu thông tin nhân viên ?" @close="closeNotifycation"
            @onActive="submit">
        </confirmModal>
        <div class="p-3">
            <h4 class="text-secondary fw-bold">Cập nhật nhân viên__:</h4>

            <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

            <div class="d-flex justify-content-center">
                <form class="w-75" @submit.prevent="{ }">
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <div class="d-flex justify-content-center">
                                <img :src="staff.hinhanh" alt="Avatar" class="w-75 rounded-4">
                            </div>
                            <!-- <div class="d-flex justify-content-center form-floating my-2">
                                <input class=" w-75 form-control" id="avatar" type="file" @change="previewFiles"
                                    ref="image">
                                <label for="avatar" style="margin-left:35px;">Thêm avatar:</label>
                            </div> -->
                        </div>
                        <div class="col-md-8 col-12">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control  ms-2" id="fullname"
                                            v-model="staff.hoten">
                                        <label for="fullname" :class="{ custom: notifycationActive }">*Họ và
                                            tên:</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <input type="date" class="form-control ms-2" id="dateofbirth"
                                            placeholder="dd/mm/yyyy" v-model="staff.ngaysinh">
                                        <label for="dateofbirth">*Ngày sinh:(MM/DD/YYYY)</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="gender" aria-label="Default select example"
                                            v-model="staff.gioitinh">
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                        <label for="gender">*Giới tính:</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control ms-2" id="cccd" v-model="staff.cccd">
                                        <label for="cccd">*Thẻ căn cước:</label>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control ms-2" id="phone"
                                            v-model="staff.sodienthoai">
                                        <label for="phone">*Số điện thoại:</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="position"
                                            aria-label="Default select example" v-model="staff.idchucvu">
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
                                        <input type="date" class="form-control ms-2" id="startdate"
                                            v-model="staff.ngaythamgia">
                                        <label for="startdate">*Ngày vào làm: (MM/DD/YYYY)</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="status" aria-label="Default select example"
                                            v-model="staff.trangthai">
                                            <option value="1">Đang làm việc</option>
                                            <option value="0">Đã nghĩ việc</option>
                                        </select>
                                        <label for="status">*Trạng thái:</label>
                                    </div>
                                    <div class="form-floating mb-2">
                                        <select class="form-select ms-2" id="salary" aria-label="Default select example"
                                            v-model="staff.idluong">
                                            <option value="1">18,000/h</option>
                                            <option value="2">26,000/h</option>
                                            <option value="3">30,000/h</option>
                                            <option value="4">45,000/h</option>
                                        </select>
                                        <label for="salary">*Hệ số lương:</label>
                                    </div>
                                </div>
                                <div class="form-floating mb-2">
                                    <textarea type="text" class="form-control ms-2" id="address" v-model="staff.diachi"
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
                            <button type="submit" class="btn btn-success ms-3" style="width: 150px;"
                                @click="closeNotifycation">Cập nhật</button> <!--On Modal -->
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
import staffService from '@/services/staff.service';
export default {
    components: {
        confirmModal,
        alertMessage,
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
            staff: {},
        };
    },

    async created() {
        //console.log(this.id);
        this.staff = await staffService.FindOneById(this.id);
        // this.staff.ngaysinh = moment(this.staff.ngaysinh).format("YYYY-MM-DD");
        // this.staff.ngaythamgia = moment(this.staff.ngaythamgia).format("YYYY-MM-DD");
    },

    methods: {
        async submit() {
            this.notifycationActive = false // Cloes Modal

            //Check info staff is full 
            if (!this.staff.hoten || !this.staff.ngaysinh || !this.staff.cccd
                || !this.staff.sodienthoai || !this.staff.ngaythamgia || !this.staff.diachi) {
                this.errorNotifycation = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'warning';
                this.messageAlert = 'Cập nhật thông tin nhân viên không thành công!';
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
                    await staffService.Update(this.id, dataUpdate).then((result) => {
                        if (result.statusCode === 200) {
                            this.errorNotifycation = false;

                            this.status = 'success';
                            this.messageAlert = 'Đã cập nhật thông tin nhân viên!';
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
    }
}
</script>

<style scoped></style>
