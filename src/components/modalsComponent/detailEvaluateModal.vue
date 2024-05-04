<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Đánh giá của khách hàng {{ idCustomer }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr class="text-dark">
                <div class="mt-4" style="min-height: 510px;">
                    <div class="d-flex justify-content-center">
                        <div class="w-75">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex">
                                    <h4 class="fw-bold text-dark">{{ agvEvaluate }} / 5 <i
                                            class="fa-solid fa-star text-warning"></i>
                                    </h4>
                                    <p class="ps-2 pt-1 text-dark">({{ countEvaluate[0] }} evaluate)</p>
                                </div>
                                <div class="d-flex">
                                    <button class="btn" @click="changeTab(0)" style="font-size: 14px;">All
                                        ({{ countEvaluate[0] }})
                                    </button>
                                    <button class="btn" @click="changeTab(1)" style="font-size: 14px;">1 <i
                                            class="fa-solid fa-star text-warning"></i>
                                        ({{ countEvaluate[1] }})
                                    </button>
                                    <button class="btn" @click="changeTab(2)" style="font-size: 14px;">2 <i
                                            class="fa-solid fa-star text-warning"></i>
                                        ({{ countEvaluate[2] }})
                                    </button>
                                    <button class="btn" @click="changeTab(3)" style="font-size: 14px;">3 <i
                                            class="fa-solid fa-star text-warning"></i>
                                        ({{ countEvaluate[3] }})</button>
                                    <button class="btn" @click="changeTab(4)" style="font-size: 14px;">4 <i
                                            class="fa-solid fa-star text-warning"></i>
                                        ({{ countEvaluate[4] }})
                                    </button>
                                    <button class="btn" @click="changeTab(5)" style="font-size: 14px;">5 <i
                                            class="fa-solid fa-star text-warning"></i>
                                        ({{ countEvaluate[5] }})
                                    </button>
                                </div>
                            </div>
                            <div class="bg-white p-2 row">
                                <div class="col-4" v-for="(value, index) in evaluate" :key="index">
                                    <evaluateCardComponent :evaluate="value">
                                    </evaluateCardComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import evaluateCardComponent from '@/components/evaluateCardComponrnt.vue';
import evaluateService from '@/services/evaluate.service';

export default {
    components: {
        evaluateCardComponent
    },

    props: {
        idCustomer: {
            type: Number,
            require: true,
        }
    },

    setup() {
        let evaluate = ref([]);
        let data = [[], [], [], [], [], []];
        let countEvaluate = [];

        const changeTab = (value) => {
            evaluate.value = data[value];
        }

        return {
            evaluate, changeTab, data, countEvaluate,
        };
    },

    data() {
        return {
            agvEvaluate: 0,
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        closeModal() {
            this.$emit('close');
        },

        async fetchData() {
            try {
                let dataFectch = await evaluateService.FindListOfCustomer(this.idCustomer);
                this.data[0] = dataFectch;
                this.evaluate = this.data[0];

                dataFectch.forEach(element => {
                    switch (element.sosao) {
                        case 1:
                            this.data[1].push(element)
                            break;
                        case 2:
                            this.data[2].push(element)
                            break;
                        case 3:
                            this.data[3].push(element)
                            break;
                        case 4:
                            this.data[4].push(element)
                            break;
                        case 5:
                            this.data[5].push(element)
                            break;

                        default:
                            break;
                    }
                });

                for (let index = 0; index < 6; index++) {//this.data.length = 6
                    const element = this.data[index];
                    this.countEvaluate[index] = element.length;
                }

                let tempPoint = 0;
                for (let index = 1; index < this.countEvaluate.length; index++) {
                    const element = this.countEvaluate[index];
                    tempPoint += (element * index);
                }
                this.agvEvaluate = (tempPoint / this.countEvaluate[0]).toFixed(1);
            } catch (error) {
                console.log(error);
            }
        }
    }

}
</script>
<style scoped lang="css">
.modalBooking {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.btn:hover {
    color: rgb(246, 156, 0);
}

.modal-booking-content {
    background-color: rgb(255, 255, 255);
    width: 60%;
    margin: 20px 0px 50px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 20px;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.status-busy {
    background-color: rgba(190, 0, 0, 0.926);
    padding: 10px;
    border-radius: 20px;
}
</style>