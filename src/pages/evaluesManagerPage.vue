<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Đánh giá của khách hàng__:</h4>
        <div class="d-flex justify-content-center">
            <div class="w-75">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <h4 class="fw-bold">4,8 / 5 <i class="fa-solid fa-star text-warning"></i></h4>
                        <p class="ps-2 pt-1">(1608 đánh giá)</p>
                    </div>
                    <div class="d-flex">
                        <button class="btn" @click="changeTab(5)" style="font-size: 14px;">Tất cả<i
                                class="fa-solid fa-star text-warning"></i>
                            (1608)</button>
                        <button class="btn" @click="changeTab(4)" style="font-size: 14px;">1 <i
                                class="fa-solid fa-star text-warning"></i>
                            (1032)</button>
                        <button class="btn" @click="changeTab(3)" style="font-size: 14px;">2 <i
                                class="fa-solid fa-star text-warning"></i>
                            (182)</button>
                        <button class="btn" @click="changeTab(2)" style="font-size: 14px;">3 <i
                                class="fa-solid fa-star text-warning"></i>
                            (182)</button>
                        <button class="btn" @click="changeTab(1)" style="font-size: 14px;">4 <i
                                class="fa-solid fa-star text-warning"></i>
                            (92)</button>
                        <button class="btn" @click="changeTab(0)" style="font-size: 14px;">5 <i
                                class="fa-solid fa-star text-warning"></i>
                            (19)</button>
                    </div>
                </div>
                <div class="bg-white p-2  row">
                    <div class="col-md-6">
                        <evaluateCardComponent v-for="(value, index) in evaluate" :key="index" :evaluate="value">
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
export default {
    components: {
        evaluateCardComponent
    },

    setup() {
        let evaluate = ref([]);
        let data = [];

        const changeTab = (value) => {
            console.log(evaluate.value);
            evaluate.value = data[value];
        }

        return {
            evaluate, changeTab, data
        };
    },

    mounted() {
        this.data[0] = [
            {
                user: 'haibang',
                date: '12/2/2024',
                star: 5,
                message: 'day la thong tin danh gia'
            },
            { user: 'haibang', date: '12/2/2024', star: 5, message: 'day la thong tin danh gia' }];
        this.data[1] = [{
            user: 'haibangsss',
            date: '12/2/2024',
            star: 4,
            message: 'day la thonsssg tin danh gia'
        },];
        this.data[2] = [{ user: 'haibansssssssssg', date: '12/2/2024', star: 3, message: 'day la thong tin danh gia' }];
        this.data[3] = [{ user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }, { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }];
        this.data[4] = [];
        this.data[5] = [{ user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }, { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }, { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }, { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' },
        { user: 'haibang', date: '12/2/2024', star: 2, message: 'day la thong tin danh gia' }];

        this.evaluate = this.data[5];//gia trin ban dau tat ca cac danh gia
    },

}
</script>

<style scoped></style>