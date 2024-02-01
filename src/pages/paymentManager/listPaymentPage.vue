<template>
    <div class="p-3">
        <detailPaymentModal class="modal-detail-bill" v-if="modalActive" :idPayment="idPayment" @close="toggleModal(0)">
        </detailPaymentModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Danh sách phiếu chi__:</h4>
            <div>
                <button class="btn btn-outline-secondary"><i class="fa-solid fa-file-excel"></i> Xuất file</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5 col-12 d-flex ">
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
            <div class="col-md-2 col-12 pt-2 d-flex justify-content-end">
                <router-link :to="{ name: 'create-payment-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Tạo mới</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã phiếu chi</th>
                        <th scope="col" class="text-center">Thời gian</th>
                        <th scope="col" class="text-center">ID Nhân viên</th>
                        <th scope="col" class="text-center">Nhà cung cấp</th>
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
                        <td class="text-center fs-5 fw-bold">142,240,000</td>
                        <td class="text-center" style="padding-top: 13px;">
                        </td>
                        <th scope="row" class="text-center">

                        </th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center">1</th>
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
                        <td class="text-center">18/1/2024</td>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
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
import detailPaymentModal from '@/components/modalsComponent/detailPaymentModal.vue';
export default {
    components: {
        detailPaymentModal
    },
    setup() {
        let modalActive = ref(false);
        let idPayment = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idPayment.value = id;
        }
        return { modalActive, idPayment, toggleModal, };
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