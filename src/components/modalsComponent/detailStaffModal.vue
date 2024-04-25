<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin nhân viên</h5>
                        <!-- {{ nhanvien.idnhanvien }} -->
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row" style="min-height: 500px;">
                    <div class="col-md-4 col-12">
                        <img :src="staff.hinhanh" alt="Avatar" class="w-100 rounded-5 pt-2">
                        <h6 class="text-center fw-bold mt-2">MS: {{ staff.idnhanvien }}</h6>
                        <h5 class="text-center fw-bold mt-2"> {{ staff.hoten }}</h5>
                        <span class="text-center" :class="{
                            'status-on': (statusMessage == 'Đang làm việc'),
                            'status-off': (statusMessage == 'Đã nghĩ việc')
                        }">{{ statusMessage }}
                        </span>
                    </div>
                    <div class="col-md-8 col-12">
                        <ul class="pt-3">
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Họ và tên</span>: {{
                                staff.hoten }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Ngày sinh</span>: {{
                                staff.ngaysinh }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Giới tính</span>: {{
                                staff.gioitinhchu }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Thẻ căn cước</span>:
                                {{ staff.cccd }}</li>
                            <li class="d-flex">
                                <span class="fw-bold" style="display: inline-block; width: 180px;">
                                    Nơi cư trú
                                </span>:
                                <span style="display: inline-block; width: 360px;">
                                    {{ staff.diachi }}
                                </span>
                            </li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Số điện thoại</span>:
                                {{ staff.sodienthoai }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Ngày bắt đầu</span>:
                                {{ staff.ngaythamgia }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Chức vụ</span>: {{
                                staff.tenchucvu }}</li>
                            <li><span class="fw-bold" style="display: inline-block; width: 180px;">Hệ số lương</span>:
                                {{ staff.idluong }}</li>
                            <li>
                                <span class="fw-bold" style="display: inline-block; width: 180px;">Hình thức trả
                                    lương</span>: tháng
                                <router-link :to="{ name: 'salary-page' }" style="text-decoration: none;">
                                    (xem lương)
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';

import staffService from '@/services/staff.service';
export default {
    props: {
        id: {
            required: true,
            type: Number,
        },

        nhanvien: {
            type: Object,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal, };
    },

    data() {
        return {
            staff: {},
            statusMessage: '',
        };
    },

    async created() {
        console.log('Nhan vien', this.nhanvien);
        this.staff = await staffService.FindOneById(this.id);
        this.staff.ngaysinh = moment(this.staff.ngaysinh).format("DD/MM/YYYY");
        this.staff.ngaythamgia = moment(this.staff.ngaythamgia).format("DD/MM/YYYY");

        if (this.staff.trangthai === 1) {
            this.statusMessage = "Đang làm việc";
        } else {
            this.statusMessage = "Đã nghĩ việc";
        }
    }
}
</script>
<style scoped lang="css">
.modalBooking {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-booking-content {
    background-color: white;
    width: 60%;
    margin: 20px 0px 70px 0px;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 20px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.status-on {
    display: inline-block;
    width: 100%;
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.status-off {
    display: inline-block;
    width: 100%;
    padding: 3px 8px;
    background-color: rgba(128, 6, 0, 0.575);
    border-radius: 15px;
}

.status-wait {
    padding: 3px 8px;
    background-color: rgba(193, 193, 2, 0.784);
    border-radius: 15px;
}

ul>li {
    list-style: none;
    margin-top: 8px;
}
</style>