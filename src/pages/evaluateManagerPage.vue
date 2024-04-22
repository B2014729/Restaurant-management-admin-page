<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Đánh giá của khách hàng:</h4>
        <div class="d-flex justify-content-center">
            <div class="w-75">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <h4 class="fw-bold">{{ agvStar }}/ 5 <i class="fa-solid fa-star text-warning"></i></h4>
                        <p class="ps-2 pt-1">({{ countEvaluate[0] }} đánh giá)</p>
                    </div>
                    <div class="d-flex">
                        <button class="btn" @click="changeTab(0)" style="font-size: 14px;">Tất cả<i
                                class="fa-solid fa-star text-warning"></i>
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
                    <div class="col-6" v-for="(value, index) in evaluate" :key="index">
                        <evaluateCardComponent :evaluate="value">
                        </evaluateCardComponent>
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

    setup() {
        let evaluate = ref([]);
        let data = [[], [], [], [], [], []];
        let countEvaluate = [];
        let agvStar = 0;

        const changeTab = (value) => {
            evaluate.value = data[value];
        }

        return {
            evaluate, changeTab, data, countEvaluate, agvStar
        };
    },

    async created() {
        await this.fetchData();

    },

    methods: {
        async fetchData() {
            try {
                let dataFectch = await evaluateService.FindAll();
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

                let sumStar = 0;
                for (let index = 0; index < 6; index++) {//this.data.length = 6
                    const element = this.data[index];
                    this.countEvaluate[index] = element.length;

                    if (index > 0) {
                        sumStar += (index * this.countEvaluate[index]);
                    }
                }

                this.agvStar = (sumStar / this.countEvaluate[0]).toFixed(1);
            } catch (error) {
                console.log(error);
            }
        }
    }

}
</script>

<style scoped></style>