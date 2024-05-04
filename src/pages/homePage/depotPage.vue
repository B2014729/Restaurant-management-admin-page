<template>
    <div class="p-3">
        <detailDepotModal v-if="modalActive" :id="idDish" @close="toggleModal(0)"></detailDepotModal>
        <div class="d-flex justify-content-between mb-2">
            <div>
                <h4 class="text-secondary fw-bold">Quản lí kho:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'home-page' }">
                        <span>Trang chủ</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'depot-page' }">
                        <span> / Quản lí kho</span>
                    </router-link>
                </div>
            </div>

            <div>
                <router-link :to="{ name: 'goods-page' }">
                    <button class="btn btn-outline-secondary">
                        DS hàng hóa
                    </button>
                </router-link>
            </div>
        </div>
        <searchComponent class="mb-2" @submit="search($event)" v-model="searchText"></searchComponent>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col" class="text-center">Mã hàng hóa</th>
                    <th scope="col" class="text-center">Tên hàng hóa</th>
                    <th scope="col" class="text-center" style="width: 90px;">Số lượng</th>
                    <th scope="col" class="text-center" style="width: 120px;">Đơn vị tính</th>
                    <th scope="col" class="text-center">Ngày nhập mới</th>
                    <th scope="col" class="text-center" style="width: 50px;"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in searchDish" :key="index">
                    <th scope="row" style="width: 50px; text-align: center;">{{ index + 1 }}</th>
                    <td style="width: 140px; text-align: center;">
                        {{ listId[index] }}
                    </td>
                    <td class="text-center">{{ item.hanghoa.tenhanghoa }}</td>
                    <td class="text-center" :class="{ 'warning-quantity': listQuantity[index] < 3 }">
                        {{ listQuantity[index] }}
                    </td>
                    <td class="text-center">
                        {{ item.hanghoa.tendonvi }}
                    </td>
                    <td class="text-center">
                        {{ formatDate(item.ngaynhap) }}
                    </td>
                    <th scope="row" class="text-center">
                        <button type="button" class="btn" @click="toggleModal(item.idhanghoa)">
                            <i class="fa-solid fa-circle-plus text-success"></i>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>

        <div class="w-100 d-flex justify-content-end">
            <router-link :to="{ name: 'create-payment-page' }">
                <button class="btn btn-success">Tạo phiếu nhập hàng</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import searchComponent from '@/components/searchComponent.vue';
import depotService from '@/services/depot.service';

import detailDepotModal from '@/components/modalsComponent/detailDepotModal.vue';
export default {
    components: {
        searchComponent, detailDepotModal
    },

    computed: {
        listDishString() {
            return this.listDish.map((dish) => {
                const { idhanghoa, } = dish;
                const { tenhanghoa } = dish.hanghoa;
                return [idhanghoa, tenhanghoa].join("");
            });
        },

        searchDish() {
            if (!this.searchText) {
                return this.listDish
            }
            return this.listDish.filter((_bill, index) => {
                return this.listDishString[index].includes(this.searchText);
            });
        }
    },

    setup() {
        let idDish = ref(0);
        let modalActive = ref(false);

        const toggleModal = (id) => {
            idDish.value = id;
            modalActive.value = !modalActive.value;
        }

        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            formatDate, toggleModal, idDish, modalActive
        };
    },

    data() {
        return {
            searchText: '',
            listDish: [],
            time: new Date(),
            listId: [],
            listQuantity: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listDish = await depotService.FindAll();

                this.listDish.forEach((element) => {
                    this.listId.push(element.idhanghoa);
                    this.listQuantity.push(element.soluong);
                })
            } catch (error) {
                console.log(error);
            }
        },

        search() {
            console.log(this.searchText);
        }
    }

}</script>

<style scoped>
table>thead>tr>th {
    background-color: var(--color-header-table);
}

.warning-quantity {
    background-color: wheat;
}
</style>
