<template>
    <div class="p-3">
        <DetailBillModal class="modal-detail-bill" v-if="modalActive" :idBill="idBill" @close="toggleModal(0)">
        </DetailBillModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Hóa đơn__:</h4>
            <div>
                <button class="btn btn-outline-secondary" @click="exportExcel">
                    <i class="fa-solid fa-file-excel"></i> Xuất file
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 d-flex ">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-5 col-12 mt-2">
                <span class="me-2">từ: </span>
                <input type="date" style="border: none;" v-model="data.start">
                <span class="mx-2">đến: </span>
                <input type="date" style="border: none;" v-model="data.end">

                <button class="btn" @click="onGetBillWhereTime"><i class="fa-solid fa-check text-success"></i></button>
            </div>
            <div class="col-md-1 col-12 pt-2 d-flex justify-content-end">
                <button class="btn"><i class="fa-solid fa-sort"></i></button>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã HĐ</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">Nhân viên</th>
                        <th scope="col" class="text-center">Số bàn</th>
                        <th scope="col" class="text-center">Tổng (vnđ)</th>
                        <th scope="col" class="text-center">Giảm (vnđ)</th>
                        <th scope="col" class="text-center">Thanh toán (vnđ)</th>
                        <th scope="col" class="text-center">Trạng thái (vnđ)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" class="text-center fw-bold  bg-success text-white">Tổng giá trị</th>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center">{{ formatNumber(amountPayment) }}</td>
                        <td class="text-center">{{ formatNumber(sumDiscount) }}</td>
                        <td class="text-center fs-5 fw-bold">{{ formatNumber(amountPayment - sumDiscount) }}</td>
                        <td class="text-center" style="padding-top: 13px;">
                        </td>
                        <th scope="row" class="text-center"></th>
                    </tr>
                    <tr v-for="(item, index) in searchBill" :key="index">
                        <th scope="row" class="text-center">{{ item.idhoadon }}</th>
                        <td class="text-center">{{ formatDateTime(item.ngaygioxuat) }}</td>
                        <td class="text-center">{{ item.tennhanvien }}</td>
                        <td class="text-center">{{ item.idban }}</td>
                        <td class="text-center">{{ formatNumber(item.thanhtoan) }}</td>
                        <td class="text-center">{{ formatNumber(item.giamgia) }}</td>
                        <td class="text-center  fw-bold">{{ formatNumber(item.thanhtoan - item.giamgia) }}</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(item.idhoadon)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';

import DetailBillModal from '@/components/modalsComponent/detailBillModal.vue';
import searchComponent from '@/components/searchComponent.vue';

import billService from '@/services/bill.service';

export default {
    components: {
        DetailBillModal, searchComponent
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

        return { modalActive, idBill, toggleModal, formatNumber, formatDateTime };
    },

    computed: {
        billListString() {
            return this.billList.map((bill) => {
                const { idhoadon, idban, } = bill;
                const nhanvien = bill.nhanvienlap.hoten;
                return [idhoadon, nhanvien, idban].join("");
            });
        },

        searchBill() {
            if (!this.searchText) {
                return this.billList
            }
            return this.billList.filter((_bill, index) => {
                return this.billListString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            searchText: '',
            billList: [],
            amountPayment: 0,
            sumDiscount: 0,
            data: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            this.billList = await billService.FindAll();
            this.billList.forEach((element) => {
                this.sumDiscount += element.giamgia;
                this.amountPayment += element.thanhtoan;
            });
        },

        async onGetBillWhereTime() {
            this.sumDiscount = 0;
            this.amountPayment = 0;
            try {
                this.billList = await billService.FindBillWhereTime(this.data.start, this.data.end);

                this.billList.forEach((element) => {
                    this.sumDiscount += element.giamgia;
                    this.amountPayment += element.thanhtoan;
                });
            } catch (error) {
                console.log(error);
                this.billList = [];
            }
        },

        search(data) {
            console.log(data);
        },

        exportExcel() {
            let data = [];
            data.push(['Mã HĐ', 'Ngày tạo', 'Nhân viên', 'Bàn', 'Thanh toán', 'Giảm giá', 'Trạng thái']);
            this.billList.forEach(element => {
                let row = [element.idhoadon, this.formatDateTime(element.ngaygioxuat), element.tennhanvien,
                element.idban, element.thanhtoan, element.giamgia, element.trangthai];
                data.push(row);
            });
            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, 'billFile.xlsx');
        }
    },
}

</script>
<style  scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}
</style>