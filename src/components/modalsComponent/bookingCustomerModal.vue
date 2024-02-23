<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin khách hàng</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-12">
                        <span><span class="fw-bold">Mã khách hàng: </span> {{ detailCustomer.idkhachhang }}</span>
                        <p><span class="fw-bold">Họ tên khách hàng: </span>{{ detailCustomer.hotenkhachhang }}</p>
                    </div>

                    <div class="col-md-6 col-12">
                        <span><span class="fw-bold">Số điện thoại: </span> {{ detailCustomer.sodienthoai }} </span>
                        <p><span class="fw-bold">Tài khoản: </span> {{ detailCustomer.tendangnhap }}</p>
                    </div>
                </div>

                <div>
                    <span class="fw-bold">Khách đặt bàn:</span>

                    <div style="min-height:350px; overflow: hidden;">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">STT</th>
                                    <th scope="col" class="text-center">Thời gian</th>
                                    <th scope="col" class="text-center">Số lượng (ng)</th>
                                    <th scope="col" class="text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in  detailCustomer.chitietdatban" :key="index">
                                    <td class="text-center" style="padding-top: 13px;">{{ index + 1 }}</td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        {{ formatDateTime(item.ngaygio) }}
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">{{ item.soluongnguoi }}</td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <span v-if="item.trangthai" class="status-success">Đã duyệt</span>
                                        <span v-else class="status-wait">Đang chờ</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
import customerService from '@/services/customer.service';

export default {
    props: {
        idCustomer: {
            required: true,
            type: Number,
        }
    },

    setup(props, context) {
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

            return `${hours}:${minutes}:${seconds} ${dateIn}/${month}/${year}`;
        }

        return { closeModal, formatDateTime };
    },

    data() {
        return {
            detailCustomer: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.detailCustomer = await customerService.FindOneById(this.idCustomer);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style  scoped lang="css">
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
    margin: 50px 0px 110px 0px;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 50px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.status-success {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.status-wait {
    padding: 3px 8px;
    background-color: rgba(193, 193, 2, 0.784);
    border-radius: 15px;
}
</style>