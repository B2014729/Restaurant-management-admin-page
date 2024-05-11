<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin đặt bàn</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <h6 class="fw-bold">Thông tin khách hàng</h6>
                        <p class="m-0"><span style="display: inline-block; width: 140px;">Họ tên khách hàng</span>: {{
                            customerInfor.hotenkhachhang }}</p>
                        <p class="m-0"><span style="display: inline-block; width: 140px;">Số điện thoại</span>: {{
                            booking.sodienthoai }}</p>
                        <p class="m-0"><span style="display: inline-block; width: 140px;">Tên đăng nhập</span>: {{
                            customerInfor.tendangnhap }}</p>
                        <div class="form-floating mt-4 w-50">
                            <select class="form-select" id="table" aria-label="Default select example"
                                v-model="booking.idban">
                                <option
                                    v-for="(item, index) in [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]"
                                    :value="item" :key="index">
                                    {{ item }}
                                </option>
                            </select>
                            <label for="table">*Chọn bàn:</label>
                        </div>
                        <span v-if="errorEmptyTable" class="text-end text-warning" style="font-size: 12px;">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            {{ messageError }}
                        </span>
                    </div>
                    <div class="col-6">
                        <h6 class="fw-bold">Thông tin đặt bàn</h6>
                        <p class="m-0"><span style="display: inline-block; width: 130px;">Ngày giờ</span>:
                            {{ formatDateTime(booking.ngaygio) }}</p>
                        <p class="m-0"><span style="display: inline-block; width: 130px;">Số lượng người</span>: {{
                            booking.soluongnguoi }}</p>
                        <p class="m-0 d-flex">
                            <span style="display: inline-block; width: 130px;">Ghi chú</span>:
                            <span class="ms-1" style="display: inline-block; width: 185px;">{{ booking.ghichu }}</span>
                        </p>
                        <div class="form-floating mt-4">
                            <select class="form-select" id="statusBooking" aria-label="Default select example"
                                v-model="booking.trangthai">
                                <option value="0" class="text-danger">Chờ xác nhận</option>
                                <option value="1" class="text-success">Đã xác nhận</option>
                            </select>
                            <label for="statusBooking">*Trạng thái:</label>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div class="mt-4">
                        <button type="button" class="btn btn-outline-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onActive">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import bookingService from '@/services/booking.service';

export default {
    props: {
        id: {
            type: Number,
            require: true,
        }
    },

    setup(props, context) {
        let errorEmptyTable = ref(false);
        let messageError = ref('');

        const closeModal = () => {
            context.emit("close");
        }


        function formatDateTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds}, ${dateIn}/${month}/${year}`;
        }

        return { closeModal, formatDateTime, errorEmptyTable, messageError };
    },

    data() {
        return {
            booking: {},
            customerInfor: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.booking = await bookingService.FindOneById(this.id);
                this.customerInfor = this.booking.thongtinkhachhang;
            } catch (error) {
                console.log(error);
            }
        },

        onActive() {
            if (Number(this.booking.idban) != 1) {
                this.errorEmptyTable = false;
                let dateNow = new Date();
                let dateBooking = new Date(this.booking.ngaygio);
                if (dateNow > dateBooking) {
                    this.errorEmptyTable = true;
                    this.messageError = "Quá hạn xác nhận và cập nhật đặt bàn này";
                } else {
                    this.$emit('onActive', {
                        idBooking: this.booking.iddatban,
                        status: Number(this.booking.trangthai),
                        idTable: Number(this.booking.idban),
                    });
                }
            } else {
                this.errorEmptyTable = true;
                this.messageError = "Vui lòng chọn bàn";
            }
        },
    }
}
</script>
<style scoped lang="css">
.modalBill {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.423);
}

.modal-bill-content {
    background-color: white;
    width: 45%;
    height: 50%;
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
        margin-top: 0px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>