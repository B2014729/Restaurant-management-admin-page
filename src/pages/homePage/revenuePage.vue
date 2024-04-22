<template>
    <div class="p-3">
        <forcastPredictionModal v-if="modalPrediction" @close="toggleModalPrediction"></forcastPredictionModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Tổng quan doanh thu:</h4>
            <div>
                <button class="btn btn-outline-success" @click="toggleModalPrediction">Doanh thu</button>
                <button class="btn btn-success  ms-2">+</button>
            </div>
        </div>

        <div class="p-2 d-flex justify-content-end" style="width: 860px;">
            <span class="me-1 p-1">Giai đoạn: tháng</span>
            <select class="form-select" style="width: 72px; height: 33px;" aria-label="Default select example"
                v-model="month">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value=" 11">11</option>
                <option value=" 12">12</option>
            </select>
            <span class=" me-1 p-1">, năm</span>
            <select class="form-select" style="width: 90px; height: 33px;" aria-label="Default select example"
                v-model="year">
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024" selected>2024</option>
            </select>
            <button class="btn" ref="BtnChange" @click="changePhase"><i
                    class="fa-solid fa-check text-success"></i></button>
        </div>
        <div class="row" style="height: 290px;">
            <div class=" col-md-8 col-12 bg-white rounded-3 ms-5" style="height: 280px;">
                <canvas class="p-2" id="chartLineRevenue"></canvas>
                <p style="font-size: 11px; text-align: center;">Biểu đồ thống kê doanh thu các ngày trong tháng.</p>
            </div>

            <div class="col-md-3 col-12 h-100  mx-3">
                <div class="p-3 bg-white rounded-3 shadow bg-body-tertiary">
                    <h5 class="fw-bold">Tổng doanh thu:</h5>
                    <h4 class="text-center fw-bold">{{ formatNumber(sumRevenue) }} VNĐ</h4>
                </div>
                <div class="p-3 mt-3 bg-white rounded-3 shadow bg-body-tertiary">
                    <h6 class="fw-bold">Tháng có doanh thu cao nhất: {{ monthMaxRevenue }}</h6>
                </div>
                <div class="p-3 mt-3 bg-white rounded-3 shadow  bg-body-tertiary">
                    <h6 class="fw-bold">Loại món yêu thích nhất: {{ typeDishOnBest }}</h6>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-7 col-12 bg-white rounded-3 mx-3 ms-5">
                <h6 class="text-secondary fw-bold pt-2">Danh sách món được yêu thích:</h6>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">STT</th>
                            <th scope="col" class="text-center">Tên món</th>
                            <th scope="col" class="text-center">Loại món</th>
                            <th scope="col" class="text-center">Giá bán (VNĐ)</th>
                            <th scope="col" class="text-center">Số lượng đã bán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in listDishSellALot" :key="index">
                            <th scope="row" class="text-center">{{ index + 1 }}</th>
                            <td class="text-center">{{ item.mon.tenmon }}</td>
                            <td class="text-center">{{ item.mon.tenloai }}</td>
                            <td class="text-center">{{ formatNumber(item.mon.gia) }}</td>
                            <td class="text-center">{{ item.soluong }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4 col-12 bg-white d-flex justify-content-center rounded-3">
                <div class="w-75">
                    <canvas class="p-2" id="chartSyntheticOnThu"></canvas>
                    <p style="font-size: 11px; text-align: center;">Biểu đồ tổng quan doanh thu theo ngày trong tuần.
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import forcastPredictionModal from '@/components/modalsComponent/forcastPredictionModal.vue';
import billService from '@/services/bill.service';
import dishSevice from '@/services/dish.service';
import Chart from 'chart.js/auto';
import { ref } from 'vue';
export default {
    components: {
        forcastPredictionModal
    },

    setup() {
        let modalPrediction = ref(false);
        const toggleModalPrediction = () => {
            modalPrediction.value = !modalPrediction.value;
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }

        return {
            formatNumber, modalPrediction, toggleModalPrediction,
        }
    },

    data() {

        return {
            month: 1,
            year: 2024,
            statisticalRevenue: [],
            sumRevenue: 0,
            monthMaxRevenue: 1,
            listDishSellALot: [],
            typeDishOnBest: '',
        };
    },

    methods: {
        async fetchData() {
            try {
                this.statisticalRevenue = await billService.GetStatisticalWithMonthAndYear(this.month, this.year);

                let listBill = await billService.FindAll();//Tinh  tong doanh thu
                listBill.forEach((element) => {
                    this.sumRevenue += element.thanhtoan;
                });

                let statistical = await billService.GetStatistical();

                let max = 0;
                for (let index = 0; index < statistical.length; index++) {//Lay thang co doanh thu cao nhat
                    const element = statistical[index];
                    if (element > max) {
                        max = element;
                        this.monthMaxRevenue = index + 1;
                    }
                }

                let listDishSellALotAll = await dishSevice.GetLishDishSellALot(); // Lay 5 mon ban nhieu nhat
                this.typeDishOnBest = listDishSellALotAll[0].mon.tenloai; //Lay loai mon duoc yeu thich nhat
                for (let index = 0; index < 5; index++) {
                    const element = listDishSellALotAll[index];
                    this.listDishSellALot[index] = element;
                }

            } catch (error) {
                console.log(error);
            }
        },

        async changePhase() {
            await this.fetchData();
        },

        onModalPrediction() {
            this.$emit('onModalPrediction');
        }
    },

    async mounted() {
        await this.fetchData();
        function chartLineRevenue(dataChart) {
            const ctx = document.getElementById('chartLineRevenue');

            let labelsArray = [];
            for (let index = 0; index <= 30; index++) {
                let labelsArrayItem = `${index + 1}`;
                labelsArray.push(labelsArrayItem);
            }

            const chartLineRevenue = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsArray,
                    datasets: [{
                        label: 'Doanh thu theo ngày',
                        data: dataChart,
                    }]
                },
                options: {
                    borderWidth: 1,
                    scales: {
                        y: {
                            type: 'linear',
                            ticks: {
                                stepSize: 1 // remove this line to get autoscalling 
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            chartLineRevenue;
        }

        function chartSyntheticOnThu() {
            const ctx = document.getElementById('chartSyntheticOnThu');

            const chartSyntheticOnThu = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ['2', '3', '4', '5', '6', '7', 'CN'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 14, 3, 5, 2, 3, 12],
                        borderWidth: 1
                    }]
                },
                options: {}

            });

            chartSyntheticOnThu;
        }
        chartLineRevenue(this.statisticalRevenue);
        chartSyntheticOnThu();
    }
}
</script>
<style lang="css" scoped></style>