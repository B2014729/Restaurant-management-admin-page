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
                        <p class="m-0">Họ tên khách hàng: {{ customerInfor.hotenkhachhang }}</p>
                        <p class="m-0">Số điện thoại: {{ customerInfor.sodienthoai }}</p>
                        <p class="m-0">Tên đăng nhập: {{ customerInfor.tendangnhap }}</p>
                    </div>
                    <div class="col-6">
                        <h6 class="fw-bold">Thông tin đặt bàn</h6>
                        <p class="m-0">Ngày giờ: {{ formatDateTime(booking.ngaygio) }}</p>
                        <p class="m-0">Số lượng người: {{ booking.soluongnguoi }}</p>
                        <p class="m-0">Trạng thái: {{ booking.trangthai }}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onActive">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bookingService from '@/services/booking.service';

export default {
    props: {
        id: {
            type: Number,
            require: true,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const onActive = () => {
            context.emit("onActive");
        }

        function formatDateTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds} ${dateIn}/${month}/${year}`;
        }

        return { closeModal, onActive, formatDateTime };
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
    height: 33%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
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