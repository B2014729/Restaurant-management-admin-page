<template>
    <div class="p-3">
        <confirmModal v-if="confirmModalActive" :message="message" @close="toggleModal(0)" @onActive="onDelete">
        </confirmModal>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="d-flex justify-content-between">
            <div>
                <h4 class="text-secondary fw-bold">Quản lí nhà cung cấp:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'supplier-page' }">
                        <span>Danh sách nhà cung cấp</span>
                    </router-link>
                </div>
            </div>

            <div>
                <button class="btn btn-outline-secondary" @click="exportExcel"><i class="fa-solid fa-file-excel"></i>
                    Xuất file</button>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-md-10 col-12">
                <searchComponent @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-2 d-flex justify-content-end">
                <router-link :to="{ name: 'create-supplier-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Thêm mới</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã NCC</th>
                        <th scope="col" class="text-center">Tên NCC</th>
                        <th scope="col" class="text-center" style="width: 270px;">Địa chỉ</th>
                        <th scope="col" class="text-center">Số điện thoại</th>
                        <th scope="col" class="text-center">Số tài khoản</th>
                        <th scope="col" class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchSupplier" :key="index">
                        <th scope="row" class="text-center fw-bold"> {{ item.idnhacungcap }}</th>
                        <td class="text-center"> {{ item.tennhacungcap }}</td>
                        <td class="text-center  address"> {{ item.diachi }}</td>
                        <td class="text-center">{{ item.sodienthoai }}</td>
                        <td class="text-center">{{ item.sotaikhoan }}</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-supplier-page', params: { id: item.idnhacungcap } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                                <button class="btn" @click="toggleModal(item.idnhacungcap)">
                                    <i class="fa-solid fa-circle-xmark text-danger"></i>
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

import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import searchComponent from '@/components/searchComponent.vue';
import supplierService from '@/services/supplier.service';

export default {
    components: {
        searchComponent,
        confirmModal,
        alertMessage
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        let confirmModalActive = ref(false);
        let message = ref('');
        let idSupplier = ref(0);

        const toggleModal = (id) => {
            idSupplier.value = id;
            message.value = `Xóa thông tin nhà cung cấp ${id} khỏi hệ thống ?`;
            confirmModalActive.value = !confirmModalActive.value;
        }

        return {
            showAlert, messageAlert, status,
            idSupplier, confirmModalActive,
            toggleModal, message,
        };
    },

    data() {
        return {
            supplierList: [],
            searchText: '',
        };
    },

    computed: {
        supplierListString() {
            return this.supplierList.map((staff) => {
                const { idnhacungcap, tennhacungcap } = staff;
                return [idnhacungcap, tennhacungcap].join("");
            });
        },

        searchSupplier() {
            if (!this.searchText) {
                return this.supplierList
            }
            return this.supplierList.filter((_staff, index) => {
                return this.supplierListString[index].includes(this.searchText);
            });
        }
    },

    async created() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            this.supplierList = await supplierService.FindAll();
        },

        async onDelete() {
            this.confirmModalActive = false;
            try {
                await supplierService.Delete(this.idSupplier).then((result) => {
                    if (result.statusCode == 200) {
                        this.messageAlert = 'Đã xóa nhà cung cấp thành công!';
                        this.status = 'success';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                        this.fetchData();
                    }
                });
            }
            catch (e) {
                this.messageAlert = 'Không thể xóa nhà cung cấp!';
                this.status = 'danger';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(e);
            }
        },

        search(data) {
            console.log(data);
        },

        exportExcel() {
            // console.log(this.supplierList);
            let data = [];
            data.push(['Mã NCC', 'Tên nhà cung cấp', 'Địa chỉ', 'Số điện thoại', 'Số tài khoản']);
            this.supplierList.forEach(element => {
                let row = [element.idnhacungcap, element.tennhacungcap,
                element.diachi, element.sodienthoai, element.sotaikhoan];
                data.push(row);
            });

            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, 'supplierInfoFile.xlsx');
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