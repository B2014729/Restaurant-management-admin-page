<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Lập báo cáo</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <h6 class="fw-bold  text-secondary">Thông tin lập báo cáo:</h6>
                    <form class="row">
                        <div class="col-md-6">
                            <div class="form-floating mb-3">
                                <select class="form-select " id="month" aria-label="Default select example"
                                    v-model="data.month">
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
                                    v-model="data.weather">
                                    <option value="1">Mát mé</option>
                                    <option value="2">Nắng</option>
                                    <option value="3">Mưa</option>
                                </select>
                                <label for="waether">*Thời tiết:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="holidays" v-model="data.numHolidays">
                                <label for="holidays">*Số ngày lễ:</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="percentPromotionMax"
                                    v-model="data.discount">
                                <label for="percentPromotionMax">*Phần trăm khuyến mãi cao nhất:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="percentPromotionMax"
                                    v-model="data.quantity">
                                <label for="percentPromotionMax">*Số ngày khuyến mãi trong tháng:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="advertisementPayment"
                                    v-model="data.advertisement">
                                <label for="advertisementPayment">*Chi phí quảng cáo dự tính:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="advertisementPayment" :value="revenue">
                                <label for="advertisementPayment">*Doanh thu trong tháng(VND):</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-outline-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onAction">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import revenueService from '@/services/revenue.service';

export default {
    props: {
        message: {
            type: String,
        },

        revenue: {
            type: Number,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal, };
    },

    data() {
        return {
            data: {},
        };
    },

    methods: {
        async onAction() {
            try {
                let data = {
                    month: this.data.month,
                    revenue: this.revenue,
                    numHolidays: this.data.numHolidays,
                    quantity: this.data.quantity,
                    weather: this.data.weather,
                    advertisement: this.data.advertisement,
                    discount: this.data.discount,
                }
                let result = await revenueService.Create(data);
                console.log(result);
                if (result.statusCode == 200) {
                    this.$emit('status', 'success');
                } else {
                    this.$emit('status', 'warning');
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    created() {
        console.log(this.revenue);
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