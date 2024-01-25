<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Tổng quan doanh thu__:</h4>
        <div class="p-2 d-flex justify-content-end" style="width: 860px;">
            <span class="me-1 p-1">Giai đoạn: tháng</span>
            <select class="form-select" style="width: 72px; height: 33px;" aria-label="Default select example">
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
            <select class="form-select" style="width: 90px; height: 33px;" aria-label="Default select example">
                <option value="3">2021</option>
                <option value="4">2022</option>
                <option value="5">2023</option>
                <option value="6" selected>2024</option>
            </select>
            <button class="btn"><i class="fa-solid fa-check text-success"></i></button>
        </div>
        <div class="row" style="height: 290px;">
            <div class=" col-md-8 col-12 bg-white rounded-3 ms-5" style="height: 280px;">

                <canvas class="p-2" id="chartLineRevenue"></canvas>
                <p style="font-size: 11px; text-align: center;">Biểu đồ thống kê doanh thu các ngày trong tháng.</p>
            </div>

            <div class="col-md-3 col-12 h-100  mx-3">
                <div class="p-3 bg-white rounded-3 shadow bg-body-tertiary">
                    <h5 class="fw-bold">Tổng doanh thu:</h5>
                    <h4 class="text-center fw-bold">1,464,552,000 VNĐ</h4>
                </div>
                <div class="p-3 mt-3 bg-white rounded-3 shadow bg-body-tertiary">
                    <h6 class="fw-bold">Tháng có doanh thu cao nhất: 12</h6>
                </div>
                <div class="p-3 mt-3 bg-white rounded-3 shadow  bg-body-tertiary">
                    <h6 class="fw-bold">Loại món yêu thích nhất: Lẩu</h6>
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
                        <tr>
                            <th scope="row" class="text-center">1</th>
                            <td class="text-center">Lẩu chua hải sản</td>
                            <td class="text-center">Lẩu</td>
                            <td class="text-center">240,000</td>
                            <td class="text-center">23</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">1</th>
                            <td class="text-center">Lẩu chua hải sản</td>
                            <td class="text-center">Lẩu</td>
                            <td class="text-center">240,000</td>
                            <td class="text-center">23</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">1</th>
                            <td class="text-center">Lẩu chua hải sản</td>
                            <td class="text-center">Lẩu</td>
                            <td class="text-center">240,000</td>
                            <td class="text-center">23</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">1</th>
                            <td class="text-center">Lẩu chua hải sản</td>
                            <td class="text-center">Lẩu</td>
                            <td class="text-center">240,000</td>
                            <td class="text-center">23</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">1</th>
                            <td class="text-center">Lẩu chua hải sản</td>
                            <td class="text-center">Lẩu</td>
                            <td class="text-center">240,000</td>
                            <td class="text-center">23</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-4 col-12 bg-white d-flex justify-content-center rounded-3">
                <div class="w-75">
                    <canvas class="p-2" id="chartSyntheticOnThu"></canvas>
                    <p style="font-size: 11px; text-align: center;">Biểu đồ tổng quan doanh thu theo ngày trong tuần.</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Chart from 'chart.js/auto';
export default {

    mounted() {
        function chartLineRevenue() {
            const ctx = document.getElementById('chartLineRevenue');


            let labelsArray = [];
            for (let index = 0; index <= 30; index++) {
                let labelsArrayItem = `${index + 1}`;
                labelsArray.push(labelsArrayItem);

            }
            const chartSyntheticOnThu = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsArray,
                    datasets: [{
                        label: 'Doanh thu theo ngày',
                        data: [10490090, 1004500, 2000000, 1056000, 3097889, 2620090, 7670090, 2970090, 4790090, 5970090, 2970090, 8970090, 5970090, 4700902, 2970090, 4770090, 3970090, 6970090, 1090909, 3797009, 4797007, 2379700, 7670090, 8670090, 5670090, 5767009, 7670090, 5767009, 7670099, 8670009, 12767003],
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

            chartSyntheticOnThu;
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
        chartLineRevenue();
        chartSyntheticOnThu();
    }
}
</script>
<style lang="css" scoped></style>