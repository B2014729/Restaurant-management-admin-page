<template>
    <div class="p-3">
        <div class="d-flex justify-content-between mb-2">
            <h4 class="text-secondary fw-bold">Quản lí kho:</h4>
            <div>
                <router-link :to="{ name: 'goods-page' }">
                    <button class="btn btn-secondary">
                        QL hàng hóa
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
                    <th scope="col" class="text-center">Số lượng</th>
                    <th scope="col" class="text-center">Ngày nhập</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in searchDish" :key="index">
                    <th scope="row" style="width: 20px;text-align: center;">{{ index + 1 }}</th>
                    <td style="width: 140px; text-align: center;">
                        {{ listId[index] }}
                    </td>
                    <td class="text-center">{{ item.hanghoa.tenhanghoa }}</td>
                    <td class="text-center">
                        {{ listQuantity[index] }}
                    </td>
                    <td class="text-center">
                        {{ formatDate(item.ngaynhap) }}
                    </td>
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
import searchComponent from '@/components/searchComponent.vue';
import depotService from '@/services/depot.service';
export default {
    components: {
        searchComponent,
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
        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            formatDate
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

<style scoped></style>
