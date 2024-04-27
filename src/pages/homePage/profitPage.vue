<template>
    <div class="p-3">
        <div class="row">
            <DetailBillModal class="modal-detail-bill" v-if="modalActive" :idBill="idBill" @close="toggleModal(0)">
            </DetailBillModal>
            <div class="col-md-4 col-12">
                <h4 class="text-secondary fw-bold">Tổng hợp chi tiết lợi nhuận:</h4>
                <div>
                    <div class="ms-2">
                        <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                            :to="{ name: 'home-page' }">
                            <span>Trang chủ</span>
                        </router-link>
                        <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                            :to="{ name: 'profit-page' }">
                            <span> / Lợi nhuận</span>
                        </router-link>
                    </div>
                </div>
                <div class="p-3 bg-white rounded-3 shadow bg-body-tertiary mt-3">
                    <h5 class="fw-bold">Lợi nhuận:</h5>
                    <h4 class="text-center fw-bold"> {{ formatNumber(profit) }} VNĐ</h4>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="w-100">
                    <canvas id="myChart"></canvas>
                </div>
                <p class="text-center" style="font-size: 11px;">Biểu đồ tổng quan doanh thu theo loại món ăn.</p>
            </div>
            <div class="col-md-2 col-12 d-flex justify-content-end">
                <div>
                    <button class="btn btn-outline-secondary mt-3"><i class="fa-solid fa-file-excel"></i> Xuất
                        file</button>
                </div>
            </div>

        </div>
        <div>
            <div class="row">
                <div class="col-md-2 col-12">
                    <h6 class="fw-bold mt-2">Danh sách hóa đơn:</h6>
                </div>
                <div class="col-md-9 col-12">
                    <span class="me-2">từ: </span>
                    <input type="date" style="border: none;" v-model="data.startdate">
                    <span class="mx-2">đến: </span>
                    <input type="date" style="border: none;" v-model="data.enddate">

                    <button class="btn" @click="onGetBillWhereTime"><i
                            class="fa-solid fa-check text-success"></i></button>
                </div>
                <div class="col-md-1 col-12">
                    <button class="btn"><i class="fa-solid fa-sort"></i></button>
                </div>
            </div>
            <div>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" class="text-center">Mã HĐ</th>
                            <th scope="col" class="text-center">Thời gian</th>
                            <th scope="col" class="text-center">Nhân viên</th>
                            <th scope="col" class="text-center">Bàn</th>
                            <th scope="col" class="text-center">Tổng (vnđ)</th>
                            <th scope="col" class="text-center">Giảm (vnđ)</th>
                            <th scope="col" class="text-center">Trạng thái</th>
                            <th scope="col" class="text-center">Thanh toán (vnđ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in billList" :key="index">
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(item.idhoadon)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <th scope="row" class="text-center">{{ item.idhoadon }}</th>
                            <td class="text-center">{{ formatDateTime(item.ngaygioxuat) }}</td>
                            <td class="text-center">{{ item.tennhanvien }}</td>
                            <td class="text-center">{{ item.idban }}</td>
                            <td class="text-center">{{ formatNumber(item.thanhtoan) }}</td>
                            <td class="text-center">{{ formatNumber(item.giamgia) }}</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center  fw-bold">{{ formatNumber(item.thanhtoan - item.giamgia) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import Chart from 'chart.js/auto';

import DetailBillModal from '@/components/modalsComponent/detailBillModal.vue';
import dishService from '@/services/dish.service';
import billService from '@/services/bill.service';
import paymentService from '@/services/payment.service';
export default {
    components: {
        DetailBillModal
    },


    setup() {
        let modalActive = ref(false);
        let idBill = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idBill.value = id;
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
        return { modalActive, idBill, toggleModal, formatDateTime, formatNumber };
    },

    data() {
        return {
            billList: [],
            data: {},
            profit: 0,
        };
    },

    async created() {
        await this.fetchData();
    },

    async mounted() {
        let listLabels = [];
        let listValueData = [];
        try {
            let listStatisticalOnDishSell = await dishService.GetStatisticalOnDishSell();
            listStatisticalOnDishSell.forEach((element) => {
                listLabels.push(element.tenloai);
                listValueData.push(element.soluong);
            });
        } catch (error) {
            console.log(error);
        }
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: listLabels,
                datasets: [{
                    label: 'Tổng doanh thu (VNĐ)',
                    data: listValueData,
                    borderWidth: 1,
                    backgroundColor: '#008B45',
                },]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        myChart;
    },


    methods: {
        async fetchData() {
            try {
                this.billList = await billService.FindAll();
                let sumbillList = 0;
                let sumpaymentList = 0;
                let listPayment = await paymentService.FindAll();

                listPayment.forEach(element => {
                    sumpaymentList += Number(element.thanhtoan);
                });
                this.billList.forEach(element => {
                    sumbillList += Number(element.thanhtoan);
                });

                this.profit = sumbillList - sumpaymentList;
            } catch (error) {
                console.log(error);
            }
        },
        async onGetBillWhereTime() {
            try {
                this.billList = await billService.FindBillWhereTime(this.data.startdate, this.data.enddate);
            } catch (error) {
                console.log(error);
                this.billList = [];
            }
        },
    }
}
</script>

<style scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.modal-detail-bill {
    transition: all 3000ms ease-in-out;
    transform: translate(100%, 1 00%) scale(1);
}

table>thead>tr>th {
    background-color: var(--color-header-table);
}
</style>