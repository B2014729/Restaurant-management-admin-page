<template>
    <div class="p-3">
        <detailPaymentModal class="modal-detail-bill" v-if="modalActive" :idPayment="idPayment" @close="toggleModal(0)">
        </detailPaymentModal>
        <div class="d-flex justify-content-between">
            <div>
                <div class="d-flex">
                    <h4 class="text-secondary fw-bold">Quản lí phiếu chi:</h4>
                    <div class="d-flex justify-content-center ms-3">
                        <div v-if="loading" class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'payment-page' }">
                        <span>Danh sách phiếu chi</span>
                    </router-link>
                </div>
            </div>
            <div>
                <button class="btn btn-outline-secondary" @click="exportExcel"><i class="fa-solid fa-file-excel"></i>
                    Xuất file
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5 col-12 d-flex ">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-5 col-12 mt-2">
                <span class="me-2">từ: </span>
                <input type="date" style="border: none;" v-model="data.start">
                <span class="mx-2">đến: </span>
                <input type="date" style="border: none;" v-model="data.end">

                <button class="btn" @click="getPaymentInTime"><i class="fa-solid fa-check text-success"></i></button>
            </div>
            <div class="col-md-2 col-12 pt-2 d-flex justify-content-end">
                <router-link :to="{ name: 'create-payment-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Tạo mới</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã phiếu chi</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">Nhân viên</th>
                        <th scope="col" class="text-center">Nhà cung cấp</th>
                        <th scope="col" class="text-center">Thanh toán (vnđ)</th>
                        <th scope="col" class="text-center">Trạng thái (vnđ)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th scope="row" class="text-center fw-bold  bg-success text-white">
                            <button class="btn btn-success fw-bold" @click="fetchData()"> Tổng giá trị</button>
                        </th>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center fs-5 fw-bold">{{ formatNumber(sumAmount) }}</td>
                        <td class="text-center" style="padding-top: 13px;">
                        </td>
                        <th scope="row" class="text-center">

                        </th>
                    </tr>
                    <tr v-for="(item, index) in searchPayment" :key="index">
                        <th scope="row" class="text-center">{{ item.idphieuchi }}</th>
                        <td class="text-center">{{ item.ngaygio }}</td>
                        <td class="text-center">{{ item.nhanvien.hoten }}</td>
                        <td class="text-center"> {{ item.nhacungcap.tennhacungcap }}</td>
                        <td class="text-center fw-bold">{{ formatNumber(item.thanhtoan) }}</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(item.idphieuchi)">
                                <i class="fa-solid fa-circle-plus text-success"></i>
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';

import detailPaymentModal from '@/components/modalsComponent/detailPaymentModal.vue';
import searchComponent from '@/components/searchComponent.vue';
import paymentService from '@/services/payment.service';
export default {
    components: {
        detailPaymentModal,
        searchComponent
    },

    setup() {
        let modalActive = ref(false);
        let idPayment = ref(0);
        let loading = ref(true);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idPayment.value = id;
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        return { modalActive, idPayment, toggleModal, formatNumber, loading, };
    },

    computed: {
        paymentListString() {
            return this.listPayment.map((payment) => {
                const { idphieuchi, nhanvien, nhacungcap } = payment;
                let hotennhanvien = nhanvien.hoten;
                let tennhacungcap = nhacungcap.tennhacungcap;
                return [idphieuchi, hotennhanvien, tennhacungcap].join("");
            });
        },

        searchPayment() {
            if (!this.searchText) {
                return this.listPayment
            }
            return this.listPayment.filter((_payment, index) => {
                return this.paymentListString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            listPayment: [],
            sumAmount: 0,
            searchText: '',
            data: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.sumAmount = 0;
                this.listPayment = await paymentService.FindAll();
                if (this.listPayment.length > 0) {
                    this.listPayment.forEach((element) => {
                        this.sumAmount += element.thanhtoan;
                        element.ngaygio = moment(element.ngaygio).format("DD/MM/YYYY");
                    });
                }
                this.loading = false;
            }
            catch (error) {
                console.log(error);
            }
        },

        exportExcel() {
            let data = [];
            data.push(['Mã PC', 'NCC', 'Nhân viên', 'Ngày lập', 'Hàng hóa', 'Số lượng', 'Đơn giá', 'Giảm']);
            this.listPayment.forEach(element => {
                element.thongtinchitiet.forEach(item => {
                    let row = [element.idphieuchi, element.nhacungcap.tennhacungcap, element.nhanvien.hoten,
                    element.ngaygio, item.hanghoa.tenhanghoa, item.soluong, item.dongia, item.giam];
                    data.push(row);
                });
            });

            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, 'paymentFile.xlsx');
        },

        search(data) {
            console.log(data);
        },

        async getPaymentInTime() {
            try {
                this.listPayment = [];
                this.sumAmount = 0;
                this.listPayment = await paymentService.getPaymentWhereTime(this.data.start, this.data.end);
                if (this.listPayment.length > 0) {
                    this.listPayment.forEach((element) => {
                        this.sumAmount += element.thanhtoan;
                        element.ngaygio = moment(element.ngaygio).format("DD/MM/YYYY");
                    });
                }
            } catch (error) {
                this.listPayment = [];
                this.sumAmount = 0;
                console.log(error);
            }
        }
    }
}

</script>
<style scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

table>thead>tr>th {
    background-color: var(--color-header-table);
}
</style>