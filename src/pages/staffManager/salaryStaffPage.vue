<template>
    <div class="p-3">
        <detailSalaryModal class="modal-detail-bill" v-if="modalActive" :idStaff="idStaff" @close="toggleModal(0)">
        </detailSalaryModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Thông tin lương__:</h4>
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
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">STT</th>
                        <th scope="col" class="text-center">Mã NV</th>
                        <th scope="col" class="text-center">Họ và tên</th>
                        <th scope="col" class="text-center">Lương (vnđ/h)</th>
                        <th scope="col" class="text-center">Hình thức</th>
                        <th scope="col" class="text-center">Tổng giờ làm</th>
                        <th scope="col" class="text-center">Thưởng (vnđ)</th>
                        <th scope="col" class="text-center">Phạt (vnđ)</th>
                        <th scope="col" class="text-center">Tổng (vnđ)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(23)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">105,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(2)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center">1</td>
                        <th scope="row" class="text-center">2</th>
                        <td class="text-center">Dương Hãi Băng</td>
                        <td class="text-center">36,000</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">164</td>
                        <td class="text-center">250,000</td>
                        <td class="text-center">115,000</td>
                        <td class="text-center fw-bold">6,039,000</td>
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
import detailSalaryModal from '@/components/modalsComponent/detailSalaryModal.vue';
export default {
    components: {
        detailSalaryModal
    },
    setup() {
        let modalActive = ref(false);
        let idStaff = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idStaff.value = id;
        }
        return { modalActive, idStaff, toggleModal, };
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