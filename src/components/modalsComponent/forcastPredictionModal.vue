<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Dự đoán doanh thu</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <h6 class="fw-bold  text-secondary">Chọn thông tin cho tháng cần dự đoán:</h6>
                    <form class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <select class="form-select " id="month" aria-label="Default select example"
                                    v-model="promotion.month">
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
                                <label for="month">*Tháng:</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select class="form-select " id="waether" aria-label="Default select example"
                                    v-model="promotion.weather">
                                    <option value="1">Mát mé</option>
                                    <option value="2">Nắng</option>
                                    <option value="3">Mưa</option>
                                </select>
                                <label for="waether">*Thời tiết:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="holidays" v-model="promotion.holidays">
                                <label for="holidays">*Số ngày lễ:</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="percentPromotionMax"
                                    v-model="promotion.percentPromotionMax">
                                <label for="percentPromotionMax">*Phần trăm khuyến mãi cao nhất:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="advertisementPayment"
                                    v-model="promotion.advertisementPayment">
                                <label for="advertisementPayment">*Chi phí quảng cáo dự tính:</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="form-floating mb-2 float-end">
                    <span class="fw-bold float-end">Doanh thu dự đoán:
                        <span v-if="isGrow" class="text-success"> {{ result }} </span>
                        <span v-else class="text-danger"> {{ result }} </span>
                        vnd
                    </span>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-outline-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onAction">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import forcastPredictionService from '@/services/forcastPrediction.service.js';
export default {
    props: {
        message: {
            type: String,
        }
    },

    setup(props, context) {
        let result = ref(0);
        let isGrow = ref(true);
        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal, result, isGrow };
    },

    data() {
        return {
            promotion: {},
        };
    },

    methods: {
        async onAction() {
            let current = this.result;
            try {
                console.log(this.promotion);
                let resultForcast = await forcastPredictionService.Forcast(this.promotion);
                this.result = resultForcast;
                if (current > this.result) {
                    this.isGrow = false;
                } else {
                    this.isGrow = true;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped lang="css">
.modalBill {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {
    background-color: white;
    width: 50%;
    height: 60%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 0px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>