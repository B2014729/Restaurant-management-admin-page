<template>
    <div class="p-3">
        <bookingCustomerModal v-if="modalActive" :idCustomer="id" @close="toggleModal(0)"></bookingCustomerModal>
        <h4 class="text-secondary fw-bold">Quản lí khách hàng__:</h4>
        <div class="row">
            <div class="col-md-9 col-12">
                <div class="d-flex">
                    <button type="button" class="btn btn-outline-secondary me-1"><i
                            class="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                        aria-describedby="button-addon2">

                </div>
                <div class="mt-2">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">STT</th>
                                <th scope="col" class="text-center">Tên khách hàng</th>
                                <th scope="col" class="text-center">Số điện thoại</th>
                                <th scope="col" class="text-center">Tài khoản</th>
                                <th scope="col" class="text-center">Đặt bàn</th>
                                <th scope="col" class="text-center">Trạng thái</th>
                                <th scope="colq"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center" style="padding-top: 13px;">1</td>
                                <td class="text-center" style="padding-top: 13px;">Dương Hãi Băng</td>
                                <td class="text-center" style="padding-top: 13px;">0398898909</td>
                                <td class="text-center" style="padding-top: 13px;">haibang</td>
                                <td class="text-center" style="padding-top: 13px;">0</td>
                                <td class="text-center" style="padding-top: 13px;">Mới</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(13), sendData">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                            <tr>
                                <td class="text-center" style="padding-top: 13px;">1</td>
                                <td class="text-center" style="padding-top: 13px;">Dương Hãi Băng</td>
                                <td class="text-center" style="padding-top: 13px;">0398898909</td>
                                <td class="text-center" style="padding-top: 13px;">haibang</td>
                                <td class="text-center" style="padding-top: 13px;">0</td>
                                <td class="text-center" style="padding-top: 13px;">Mới</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(13), sendData">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                            <tr>
                                <td class="text-center" style="padding-top: 13px;">1</td>
                                <td class="text-center" style="padding-top: 13px;">Dương Hãi Băng</td>
                                <td class="text-center" style="padding-top: 13px;">0398898909</td>
                                <td class="text-center" style="padding-top: 13px;">haibang</td>
                                <td class="text-center" style="padding-top: 13px;">0</td>
                                <td class="text-center" style="padding-top: 13px;">Mới</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(13), sendData">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                            <tr>
                                <td class="text-center" style="padding-top: 13px;">1</td>
                                <td class="text-center" style="padding-top: 13px;">Dương Hãi Băng</td>
                                <td class="text-center" style="padding-top: 13px;">0398898909</td>
                                <td class="text-center" style="padding-top: 13px;">haibang</td>
                                <td class="text-center" style="padding-top: 13px;">0</td>
                                <td class="text-center" style="padding-top: 13px;">Mới</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(13), sendData">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                            <tr>
                                <td class="text-center" style="padding-top: 13px;">1</td>
                                <td class="text-center" style="padding-top: 13px;">Dương Hãi Băng</td>
                                <td class="text-center" style="padding-top: 13px;">0398898909</td>
                                <td class="text-center" style="padding-top: 13px;">haibang</td>
                                <td class="text-center" style="padding-top: 13px;">0</td>
                                <td class="text-center" style="padding-top: 13px;">Mới</td>
                                <th scope="row" class="text-center">
                                    <button type="button" class="btn" @click="toggleModal(13), sendData">
                                        <i class="fa-solid fa-circle-plus text-success"></i></button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-3 col-12 bg-white rounded-4 shadow">
                <div class="pt-2"><span class="fw-bold">Đánh giá của khách hàng</span></div>

                <div>
                    <evaluateCardComponrnt></evaluateCardComponrnt>
                    <evaluateCardComponrnt></evaluateCardComponrnt>
                    <evaluateCardComponrnt></evaluateCardComponrnt>
                    <evaluateCardComponrnt></evaluateCardComponrnt>
                    <evaluateCardComponrnt></evaluateCardComponrnt>
                    ...
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import evaluateCardComponrnt from '@/components/evaluateCardComponrnt.vue';
import bookingCustomerModal from '@/components/modalsComponent/bookingCustomerModal.vue';
export default {
    components: {
        evaluateCardComponrnt,
        bookingCustomerModal
    },

    setup() {
        let modalActive = ref(false);
        let id = ref(0);

        const toggleModal = (idToggle) => {
            modalActive.value = !modalActive.value;
            id.value = idToggle;
        }
        return { modalActive, id, toggleModal, };
    },
}
</script>

<style scoped></style>