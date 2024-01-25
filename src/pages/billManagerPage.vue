<template>
    <div class="p-3">
        <DetailBillModal class="modal-detail-bill" v-if="modalActive" :idBill="idBill" @close="toggleModal(0)">
        </DetailBillModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Hóa đơn__:</h4>
            <div>
                <button class="btn btn-outline-secondary"><i class="fa-solid fa-file-excel"></i> Xuất file</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 d-flex ">
                <button type="button" class="btn btn-outline-secondary me-1"><i
                        class="fa-solid fa-magnifying-glass"></i></button>
                <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                    aria-describedby="button-addon2">
            </div>
            <div class="col-md-5 col-12 mt-2">
                <span class="me-2">từ: </span>
                <input type="date" style="border: none;">
                <span class="mx-2">đến: </span>
                <input type="date" style="border: none;">

                <button class="btn"><i class="fa-solid fa-check text-success"></i></button>
            </div>
            <div class="col-md-1 col-12 pt-2 d-flex justify-content-end">
                <button class="btn"><i class="fa-solid fa-sort"></i></button>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã HĐ</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">ID Nhân viên</th>
                        <th scope="col" class="text-center">Số bàn</th>
                        <th scope="col" class="text-center">Tổng (vnđ)</th>
                        <th scope="col" class="text-center">Giảm (vnđ)</th>
                        <th scope="col" class="text-center">Thanh toán (vnđ)</th>
                        <th scope="col" class="text-center">Trạng thái (vnđ)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <th scope="row" class="text-center fw-bold  bg-success text-white">Tổng giá trị</th>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center">2,240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center fs-5 fw-bold">142,240,000</td>
                        <td class="text-center" style="padding-top: 13px;">

                        </td>
                        <th scope="row" class="text-center">

                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">19:37 18/1/2024</td>
                        <td class="text-center">3</td>
                        <td class="text-center">13</td>
                        <td class="text-center">240,000</td>
                        <td class="text-center">0</td>
                        <td class="text-center  fw-bold">240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span class="status">Đã thanh toán</span>
                        </td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>

import { ref } from 'vue';
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
}

</script>
<style  scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}
</style>