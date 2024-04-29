<template>
    <div class="w-75 ms-5 mb-4">
        <div>
            <canvas id="myChart"></canvas>
        </div>
        <p class="text-center">{{ description }}</p>
    </div>
</template>

<script>
import billService from '@/services/bill.service';
import paymentService from '@/services/payment.service';
import Chart from 'chart.js/auto';
export default {
    props: {
        description: {
            type: String
        }
    },

    data() {
        return {
            revenueInMonth: [],
            paymentInMonth: [],
        };
    },


    async mounted() {
        try {
            this.revenueInMonth = await billService.GetStatistical(2024);
            this.paymentInMonth = await paymentService.GetStatistical(2024);
        } catch (error) {
            console.log(error);
        }


        try {
            const ctx = document.getElementById('myChart');

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    datasets: [{
                        label: 'Tổng doanh thu (VNĐ)',
                        data: this.revenueInMonth,
                        borderWidth: 1,
                        backgroundColor: '#008B45',
                    }, {
                        label: 'Tổng thanh toán (VNĐ)',
                        data: this.paymentInMonth,
                        borderWidth: 1,
                        backgroundColor: '#CDBE70',
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            myChart;
        } catch (error) {
            console.log(error);
        }
    }
}
</script>