<template>
    <h4>This is the in debt page</h4>
</template>

 
<script>
import Chart from 'chart.js/auto';
export default {
    props: {
        description: {
            type: String
        }
    },

    mounted() {
        const ctx = document.getElementById('myChart');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                datasets: [{
                    label: 'Tổng doanh thu (VNĐ)',
                    data: [12, 19, 3, 5, 2, 3, 5, 7, 8, 10, 26, 30],
                    borderWidth: 1,
                    backgroundColor: '#008B45',
                }, {
                    label: 'Tổng thanh toán (VNĐ)',
                    data: [7, 11, 2, 3, 1, 2, 3, 5, 5, 6, 18, 20],
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
    }
}
</script>