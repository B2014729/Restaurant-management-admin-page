<template>
    <div class="p-3">
        <div>
            <div class="d-flex">
                <h4 class="text-secondary fw-bold">Tổng quan:</h4>
                <div class="d-flex justify-content-center ms-3">
                    <div v-if="loading" class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div class="ms-2">
                <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                    :to="{ name: 'home-page' }">
                    <span>Trang chủ</span>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-3 col-sm-6 col-12">
                <router-link style="text-decoration: none;" :to="{ name: 'revenue-page' }">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="media d-flex justify-content-between">
                                    <div class="align-self-center p-3">
                                        <i class="fa-solid fa-chart-simple fs-1 text-success"></i>
                                    </div>
                                    <div class="media-body text-right">
                                        <h3 class="text-success">{{ formatNumber(sumRevenue) }}</h3>
                                        <span>Doanh thu (VNĐ)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <router-link style="text-decoration: none;" :to="{ name: 'profit-page' }">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="media d-flex justify-content-between ">
                                    <div class="align-self-center p-3">
                                        <i class="fa-solid fa-hand-holding-dollar fs-1 text-success"></i>
                                    </div>
                                    <div class="media-body float-right">
                                        <h3 class="text-success">{{ formatNumber(profit) }}</h3>
                                        <span>Lợi nhuận (VNĐ)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <router-link style="text-decoration: none;" :to="{ name: 'depot-page' }">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="media d-flex justify-content-between">
                                    <div class="align-self-center">
                                        <i class="fa-solid fa-warehouse fs-1 text-warning"></i>
                                    </div>
                                    <div class="media-body text-right">
                                        <h3 class="text-warning">{{ countDepot }}</h3>
                                        <span>QL Kho</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <router-link style="text-decoration: none;" :to="{ name: 'consumer-page' }">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="media d-flex justify-content-between">
                                    <div class="align-self-center">
                                        <i class="fa-solid fa-users fs-1 text-secondary"></i>
                                    </div>
                                    <div class="media-body">
                                        <h3>{{ countCustomer }}</h3>
                                        <span>Khách hàng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div>
            <chart-revenue-component description='Biểu đồ tổng quan doanh thu, thanh toán từng theo tháng.'>
            </chart-revenue-component>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import ChartRevenueComponent from '@/components/chartRevenueComponent.vue';
import billService from '@/services/bill.service';
import customerService from '@/services/customer.service';
import paymentService from '@/services/payment.service';
import depotService from '@/services/depot.service';
export default {
    name: 'HomePage',
    components: {
        ChartRevenueComponent,
    },

    setup() {
        let loading = ref(true);
        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }
        return { formatNumber, loading };
    },

    data() {
        return {
            sumRevenue: 0,
            profit: 0,
            countCustomer: 0,
            countDepot: 0,
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let listBill = await billService.FindAll();//Tinh tong doanh thu

                listBill.forEach((element) => {
                    this.sumRevenue += element.thanhtoan;
                    this.sumRevenue -= element.giamgia;
                });

                let sumpaymentList = 0;
                let listPayment = await paymentService.FindAll(); //Tinh tong phieu chi => thanh toan
                listPayment.forEach(element => {
                    sumpaymentList += Number(element.thanhtoan);
                });

                this.profit = this.sumRevenue - sumpaymentList;

                let listCustomer = await customerService.FindAll(); //So luog khach hang
                this.countCustomer = listCustomer.length;

                let listProductDepot = await depotService.FindAll();
                this.countDepot = listProductDepot.length;

                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped></style>