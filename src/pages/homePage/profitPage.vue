<template>
    <div class="p-3">
        <div class="row">
            <DetailBillModal class="modal-detail-bill" v-if="modalActive" :idBill="idBill" @close="toggleModal(0)">
            </DetailBillModal>
            <div class="col-md-4 col-12">
                <h4 class="text-secondary fw-bold">Tổng hợp chi tiết lợi nhuận__:</h4>
                <div class="p-3 bg-white rounded-3 shadow bg-body-tertiary">
                    <h5 class="fw-bold">Lợi nhuận:</h5>
                    <h4 class="text-center fw-bold">464,552,000 VNĐ</h4>
                </div>
            </div>
            <div class="col-md-6 col-12">
                <div class="w-100">
                    <canvas id="myChart"></canvas>
                </div>
                <p class="text-center" style="font-size: 11px;">Biểu đồ tổng quan doanh thu theo loại món ăn.</p>
            </div>
            <div class="col-md-2 col-12 d-flex justify-content-end">
                <div>
                    <button class="btn btn-outline-secondary mt-3"><i class="fa-solid fa-file-excel"></i> Xuất file</button>
                </div>
            </div>

        </div>
        <div>
            <div class="row">
                <div class="col-md-2 col-12">
                    <h6 class="fw-bold mt-2">Danh sách hóa đơn:</h6>
                </div>
                <div class="col-md-9 col-12">
                    <span class="me-2">từ: </span>
                    <input type="date" style="border: none;">
                    <span class="mx-2">đến: </span>
                    <input type="date" style="border: none;">

                    <button class="btn"><i class="fa-solid fa-check text-success"></i></button>
                </div>
                <div class="col-md-1 col-12">
                    <button class="btn"><i class="fa-solid fa-sort"></i></button>
                </div>
            </div>
            <div>
                <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" class="text-center">Mã HĐ</th>
                            <th scope="col" class="text-center">Ngày</th>
                            <th scope="col" class="text-center">Giờ</th>
                            <th scope="col" class="text-center">Bàn</th>
                            <th scope="col" class="text-center">Mã NV</th>
                            <th scope="col" class="text-center">Tổng (vnđ)</th>
                            <th scope="col" class="text-center">Giảm (vnđ)</th>
                            <th scope="col" class="text-center">Trạng thái</th>
                            <th scope="col" class="text-center">Thanh toán (vnđ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(23)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center">
                                <button type="button" class="btn" @click="toggleModal(13)">
                                    <i class="fa-solid fa-circle-plus text-success"></i></button>
                            </th>
                            <td class="text-center" style="padding-top: 13px;">1789</td>
                            <td class="text-center" style="padding-top: 13px;">19/1/1024</td>
                            <td class="text-center" style="padding-top: 13px;">18:40</td>
                            <td class="text-center" style="padding-top: 13px;">13</td>
                            <td class="text-center" style="padding-top: 13px;">3</td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                            <td class="text-center" style="padding-top: 13px;">0</td>
                            <td class="text-center" style="padding-top: 13px;">
                                <span class="status">Đã thanh toán</span>
                            </td>
                            <td class="text-center" style="padding-top: 13px;">345,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

 
<script>
// import { onMounted, getCurrentInstance } from 'vue';
import { ref } from 'vue';
import Chart from 'chart.js/auto';
import DetailBillModal from '@/components/modalsComponent/detailBillModal.vue';
export default {
    components: {
        DetailBillModal
    },
    setup() {
        let modalActive = ref(false);
        let idBill = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idBill.value = id;
        }
        return { modalActive, idBill, toggleModal, };
    },

    mounted() {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Lau', 'Nuong', 'Goi', 'Lau', 'Nuong', 'Goi', 'Lau', 'Nuong', 'Goi', 'Lau', 'Nuong', 'Goi', 'Lau', 'Nuong', 'Goi',],
                datasets: [{
                    label: 'Tổng doanh thu (VNĐ)',
                    data: [12, 19, 3, 5, 2, 3, 5, 7, 8, 10, 26, 30, 14, 30, 14],
                    borderWidth: 1,
                    backgroundColor: '#008B45',
                },]
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
    },
}
</script>

<style  scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.modal-detail-bill {
    transition: all 3000ms ease-in-out;
    transform: translate(100%, 1 00%) scale(1);
}
</style>