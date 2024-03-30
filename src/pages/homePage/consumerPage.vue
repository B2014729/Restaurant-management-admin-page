<template>
    <div class="p-3">
        <bookingCustomerModal v-if="modalActive" :idCustomer="id" @close="toggleModal(0)"></bookingCustomerModal>
        <h4 class="text-secondary fw-bold">Quản lí khách hàng__:</h4>
        <div class="row">
            <div class="col-md-9 col-12">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
                <div class="mt-2">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">STT</th>
                                <th scope="col" class="text-center">Tên khách hàng</th>
                                <th scope="col" class="text-center">Số điện thoại</th>
                                <th scope="col" class="text-center">Tài khoản</th>
                                <th scope="col" class="text-center">Đặt bàn</th>
                                <th scope="col" class="text-center">Trạng thái</th>
                                <th scope="colq"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in searchCustomer" :key="index">
                                <td class="text-center" style="padding-top: 13px;">{{ index + 1 }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ item.hotenkhachhang }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ item.sodienthoai }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ item.tendangnhap }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ item.datban }}</td>
                                <td class="text-center" style="padding-top: 13px;">{{ item.trangthai }}</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(item.idkhachhang)">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-3 col-12 bg-white rounded-4 shadow">
                <div class="pt-2"><span class="fw-bold">Đánh giá của khách hàng gần đây</span></div>
                <div>
                    <evaluateCardComponent v-for="(item, index) in evalueList" :key="index" :evaluate="item">
                    </evaluateCardComponent>
                    ...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import evaluateCardComponent from '@/components/evaluateCardComponrnt.vue';
import bookingCustomerModal from '@/components/modalsComponent/bookingCustomerModal.vue';
import searchComponent from '@/components/searchComponent.vue';

import customerService from '@/services/customer.service';
import evaluateService from '@/services/evaluate.service';

export default {
    components: {
        evaluateCardComponent,
        bookingCustomerModal,
        searchComponent
    },

    setup() {
        let modalActive = ref(false);
        let id = ref(0);

        const toggleModal = (idToggle) => {
            modalActive.value = !modalActive.value;
            id.value = idToggle;
        }
        return { modalActive, id, toggleModal, };
    },

    computed: {
        customerListString() {
            return this.listCustomer.map((customer) => {
                const { sodienthoai, tendangnhap, } = customer;
                return [sodienthoai, tendangnhap].join("");
            });
        },

        searchCustomer() {
            if (!this.searchText) {
                return this.listCustomer
            }
            return this.listCustomer.filter((_Customer, index) => {
                return this.customerListString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            listCustomer: [],
            evalueList: [],
            searchText: '',
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listCustomer = await customerService.FindAll();
                let evalues = await evaluateService.FindAll();

                for (let index = 0; index < 5; index++) {
                    this.evalueList.push(evalues[index]);
                }
            } catch (error) {
                console.log(error);
            }
        },

        search(data) {
            console.log(data);
        }
    }
}
</script>

<style scoped></style>