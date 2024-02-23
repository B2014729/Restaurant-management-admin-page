<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Tổng quan__:</h4>
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
                                        <h3 class="text-success">156,706,909</h3>
                                        <span>Lợi nhuận (VNĐ)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-xl-3 col-sm-6 col-12">
                <router-link style="text-decoration: none;" :to="{ name: 'indebt-page' }">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <div class="media d-flex justify-content-between">
                                    <div class="align-self-center">
                                        <i class="fa-solid fa-warehouse fs-1 text-warning"></i>
                                    </div>
                                    <div class="media-body text-right">
                                        <h3 class="text-warning">34,756</h3>
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
                                        <h3>423</h3>
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
            <chart-revenue-component
                description='Biểu đồ tổng quan doanh thu, thanh toán từng theo tháng.'></chart-revenue-component>
        </div>
    </div>
</template>
<script>
import ChartRevenueComponent from '@/components/chartRevenueComponent.vue';
import billService from '@/services/bill.service';
export default {
    name: 'HomePage',
    components: {
        ChartRevenueComponent,
    },

    setup() {
        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }
        return { formatNumber };
    },

    data() {
        return {
            sumRevenue: 0,
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                let listBill = await billService.FindAll();//Tinh  tong doanh thu
                listBill.forEach((element) => {
                    this.sumRevenue += element.thanhtoan;
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped></style>