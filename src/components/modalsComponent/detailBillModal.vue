<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin chi tiết hóa đơn {{ idBill }}</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Mã hóa đơn: </span> {{ bill.idhoadon }}</span>
                        <p><span class="fw-bold">Nhân viên: </span> {{ bill.tennhanvien }}</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <p><span class="fw-bold">Bàn: </span> {{ bill.idban }}</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Ngày giờ: </span> {{ formatDateTime(bill.ngaygioxuat) }} </span>
                        <p><span class="fw-bold">Trạng thái: </span> <span class="status">Đã thanh toán</span></p>
                    </div>
                </div>

                <div>
                    <span class="fw-bold">Danh sách món:</span>

                    <div style="min-height:360px; overflow: hidden;">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">STT</th>
                                    <th scope="col" class="text-center">Tên món</th>
                                    <th scope="col" class="text-center" style="width: 150px;">Đơn giá (vnđ)</th>
                                    <th scope="col" class="text-center" style="width: 90px;">Số lượng</th>
                                    <th scope="col" class="text-center" style="width: 150px;">Tổng (vnđ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in bill.chitietdatmon" :key="index">
                                    <td class="text-center" style="padding-top: 13px;">{{ index + 1 }}</td>
                                    <td class="text-center" style="padding-top: 13px;">{{ item.tenmon }}</td>
                                    <td class="text-center" style="padding-top: 13px;">{{ formatNumber(item.gia) }}
                                    </td>

                                    <td class="text-center" style="padding-top: 13px;">{{ item.soluong }}</td>
                                    <td class="text-center" style="padding-top: 13px;">{{
                                        formatNumber(item.soluong * item.gia) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end">
                        <p class="fw-bold m-0">Khuyến mãi combo: {{ formatNumber(bill.giamgia) }} vnđ</p>
                    </div>
                    <div class="d-flex justify-content-end">
                        <p class="fw-bold">Thanh toán: {{ formatNumber(bill.thanhtoan) }} vnđ</p>
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
import billService from '@/services/bill.service';

export default {
    props: {
        idBill: {
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

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        return { closeModal, formatNumber, formatDateTime };
    },

    data() {
        return {
            bill: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            let listDishBill = [];
            this.bill = await billService.FindOneById(this.idBill);
            this.bill.chitietdatmon.forEach(element => {
                if (Object.keys(element.khuyenmai).length == 0) {
                    element.mon.soluong = element.soluong;
                    listDishBill.push(element.mon);
                } else {
                    listDishBill.push(...element.mon);
                }
            });
            this.bill.chitietdatmon = listDishBill;
            console.log(listDishBill)
        }
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
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {
    background-color: white;
    width: 60%;
    margin: 40px 0px;
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
        margin-top: 40px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}

.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}
</style>