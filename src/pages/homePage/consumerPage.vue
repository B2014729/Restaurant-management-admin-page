<template>
    <div class="p-3">
        <bookingCustomerModal v-if="modalActive" :idCustomer="id" @close="toggleModal(0)"></bookingCustomerModal>
        <detailEvaluateModal v-if="modalActiveEval" :idCustomer="id" @close="toggleModalEval(0)"></detailEvaluateModal>
        <div>
            <h4 class="text-secondary fw-bold">Quản lí khách hàng:</h4>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'home-page' }">
                    <span>Trang chủ</span>
                </router-link>
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'consumer-page' }">
                    <span> / Khách hàng</span>
                </router-link>
            </div>
        </div>
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
                                        <i class="fa-solid fa-circle-plus text-success"></i>
                                    </button>
                                    <button type="button" class="btn" @click="toggleModalEval(item.idkhachhang)">
                                        <i class="fa-solid fa-star text-warning"></i>
                                    </button>
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
                    <router-link :to="{ name: 'evalues-page' }" style="text-decoration: none; font-size: 13px;">
                        Xem chi tiết
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import evaluateCardComponent from '@/components/evaluateCardComponrnt.vue';
import bookingCustomerModal from '@/components/modalsComponent/bookingCustomerModal.vue';
import detailEvaluateModal from '@/components/modalsComponent/detailEvaluateModal.vue';
import searchComponent from '@/components/searchComponent.vue';

import customerService from '@/services/customer.service';
import evaluateService from '@/services/evaluate.service';

export default {
    components: {
        evaluateCardComponent,
        bookingCustomerModal,
        detailEvaluateModal,
        searchComponent
    },

    setup() {
        let modalActive = ref(false);
        let modalActiveEval = ref(false);
        let id = ref(0);

        const toggleModal = (idToggle) => {
            modalActive.value = !modalActive.value;
            id.value = idToggle;
        }

        const toggleModalEval = (idToggle) => {
            modalActiveEval.value = !modalActiveEval.value;
            id.value = idToggle;
        }
        return { modalActive, id, toggleModal, modalActiveEval, toggleModalEval };
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
                if (evalues.length >= 5) {
                    for (let index = 0; index < 5; index++) {
                        this.evalueList.push(evalues[index]);
                    }
                }
                else {
                    this.evalueList = evalues;
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

<style scoped>
table>thead>tr>th {
    background-color: var(--color-header-table);
}
</style>