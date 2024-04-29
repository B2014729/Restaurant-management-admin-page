<template>
    <div class="p-3">
        <detailOrderModal v-if="modalActiveDetailOrder" @close=toggleModalDetailOrder(0) :idOrder="idOrder">
        </detailOrderModal>
        <div class="d-flex justify-content-between">
            <div>
                <h4 class="text-secondary fw-bold">Quản lí gọi món:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'supplier-page' }">
                        <span>Danh sách gọi món</span>
                    </router-link>
                </div>
            </div>

            <div>
                <button class="btn btn-outline-secondary" @click="exportExcel"><i class="fa-solid fa-file-excel"></i>
                    Xuất file</button>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-md-9 col-12">
                <searchComponent @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-3 d-flex justify-content-end">
                <div class="pt-2">
                    <span class="fw-bold pe-2">Ngày: </span>
                </div>
                <input class="h-75 mt-2" type="date" v-model="dateSelect" @change="onChangeDate">
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="width: 120px;">Mã Order</th>
                        <th scope="col" class="text-center">Nhân viên</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">Bàn</th>
                        <th scope="col" class="text-center">Trạng thái</th>
                        <th scope="col" class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchOrder" :key="index">
                        <th scope="row" class="text-center fw-bold"> {{ item.iddatmon }}</th>
                        <td class="text-center"> {{ item.nhanvien.hoten }}</td>
                        <td class="text-center"> {{ formatTime(item.thoidiemdat) }}</td>
                        <td class="text-center">{{ item.idban }}</td>
                        <td class="text-center">
                            <span v-if="item.trangthai == 1" class="text-warning fw-bold">Gọi món thêm</span>
                            <span v-else class="text-success fw-bold">Gọi món mới</span>
                        </td>
                        <td class="text-center" style="padding-top: 0px; width: 50px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn" @click="toggleModalDetailOrder(item.iddatmon)">
                                    <i class="fa-solid fa-circle-info text-success"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex">
                <h6 class="text-secondary fw-bold">Tất cả:
                    <button class="btn" v-if="!showAll" @click="toggleShowAll"><i
                            class="fa-solid fa-chevron-down"></i></button>
                    <button class="btn" v-else @click="toggleShowAll"><i class="fa-solid fa-chevron-up"></i></button>
                </h6>
            </div>

            <table v-if="showAll" class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã Order</th>
                        <th scope="col" class="text-center">Nhân viên</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">Ngày</th>
                        <th scope="col" class="text-center">Bàn</th>
                        <th scope="col" class="text-center">Trạng thái</th>
                        <th scope="col" class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listOrderAll" :key="index">
                        <th scope="row" class="text-center fw-bold"> {{ item.iddatmon }}</th>
                        <td class="text-center"> {{ item.nhanvien.hoten }}</td>
                        <td class="text-center"> {{ formatTime(item.thoidiemdat) }}</td>
                        <td class="text-center"> {{ formatDate(item.thoidiemdat) }}</td>
                        <td class="text-center">{{ item.idban }}</td>
                        <td class="text-center">
                            <span v-if="item.trangthai == 1" class="text-warning fw-bold">Gọi món thêm</span>
                            <span v-else class="text-success fw-bold">Gọi món mới</span>
                        </td>
                        <td class="text-center" style="padding-top: 0px; width: 50px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn" @click="toggleModalDetailOrder(item.iddatmon)"><i
                                        class="fa-solid fa-circle-info text-success"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import * as XLSX from 'xlsx/xlsx.mjs';

import searchComponent from '@/components/searchComponent.vue';
import detailOrderModal from '@/components/modalsComponent/detailOrderModal.vue';

import orderService from '@/services/order.service';

export default {
    components: {
        searchComponent, detailOrderModal
    },

    setup() {
        let showAll = ref(false);

        const toggleShowAll = () => {
            showAll.value = !showAll.value;
        }

        let modalActiveDetailOrder = ref(false);
        let idOrder = ref(0);

        const toggleModalDetailOrder = (id) => {
            idOrder.value = id;
            modalActiveDetailOrder.value = !modalActiveDetailOrder.value;
        }

        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${year}-${month}-${dateIn}`;
        }

        function formatTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;

            return `${hours}:${minutes}:${seconds} `;
        }

        return {
            showAll, toggleShowAll,
            idOrder, modalActiveDetailOrder,
            toggleModalDetailOrder,
            formatDate, formatTime
        };
    },

    data() {
        return {
            listOrderAll: [],
            listOrderCurrent: [],
            searchText: '',
            dateSelect: '',
        };
    },

    computed: {
        orderListString() {
            return this.listOrderCurrent.map((order) => {
                const { iddatmon, idban } = order;
                const { hoten } = order.nhanvien;
                return [iddatmon, idban, hoten,].join("");
            });
        },

        searchOrder() {
            if (!this.searchText) {
                return this.listOrderCurrent
            }
            return this.listOrderCurrent.filter((_order, index) => {
                return this.orderListString[index].includes(this.searchText);
            });
        }
    },

    async created() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.dateSelect = this.formatDate(new Date());
                this.listOrderCurrent = [];
                this.listOrderAll = await orderService.FindAll();
                if (this.listOrderAll.length > 0) {
                    this.listOrderAll.forEach(element => {
                        if (this.formatDate(element.thoidiemdat) == this.dateSelect) {
                            this.listOrderCurrent.push(element);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        search(data) {
            console.log(data);
        },

        exportExcel() {
            let data = [];
            data.push(['Mã order', 'Nhân viên', 'Bàn', 'Thời gian', 'Ngày', 'Trạng thái']);
            this.listOrderCurrent.forEach(element => {
                let row = [element.iddatmon, element.nhanvien.hoten,
                element.idban, this.formatTime(element.thoidiemdat), this.formatDate(element.thoidiemdat), element.trangthai];
                data.push(row);
            });

            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, 'orderDateList.xlsx');
        },

        onChangeDate() {
            this.listOrderCurrent = [];
            if (this.listOrderAll.length > 0) {
                this.listOrderAll.forEach(element => {
                    if (this.formatDate(element.thoidiemdat) == this.dateSelect) {
                        this.listOrderCurrent.push(element);
                    }
                });
            }
        }
    },
}

</script>
<style scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.address {
    width: 270px;
    height: 46.5px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

table>thead>tr>th {
    background-color: var(--color-header-table);
}
</style>