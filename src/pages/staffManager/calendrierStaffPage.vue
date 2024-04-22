<template>
    <div class="p-3">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <h4 class="text-secondary fw-bold">Lịch làm việc:</h4>
                <div class="ms-4 d-flex">
                    <select class="form-select" aria-label="Default select example" v-model="phase" @change="onPhases">
                        <option v-for="(item, index) in phaseList" :key="index" :value="item.idgiaidoan">
                            {{ formatDate(item.ngaybatdau) }} - {{ formatDate(item.ngayketthuc) }}
                        </option>
                    </select>
                </div>
            </div>
            <router-link :to="{ name: 'arrange-work-staff-page' }">
                <button class="btn btn-outline-success h-100">Xếp lịch</button>
            </router-link>
        </div>
        <div class="d-flex justify-content-end">
            <ul class="d-flex">
                <li style="list-style: none; font-size: 13px;" class="me-4 text-success"><i
                        class="fa-solid fa-circle  text-success"></i>
                    Ca sáng (1)
                </li>
                <li style="list-style: none; font-size: 13px;" class="me-4 text-warning"><i
                        class="fa-solid fa-circle  text-warning"></i>
                    Ca chiều (2)
                </li>
                <li style="list-style: none; font-size: 13px;" class="me-4 text-dark"><i
                        class="fa-solid fa-circle  text-dark"></i>
                    Ca tối (3)
                </li>
                <li style="list-style: none; font-size: 13px;" class="me-4 text-danger"><i
                        class="fa-solid fa-circle  text-danger"></i>
                    Ca full (4)
                </li>
                <li style="list-style: none; font-size: 13px;" class="me-4 text-primary"><i
                        class="fa-solid fa-circle text-primary"></i>
                    Ca sáng + chiều (5)
                </li>
                <li style="list-style: none; font-size: 13px;" class="me-4 text-secondary"><i
                        class="fa-solid fa-circle  text-secondary"></i>
                    Ca chiều + tối (6)
                </li>
            </ul>
        </div>
        <div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse1Example" aria-expanded="false" aria-controls="collapse1Example">
                    Lịch làm việc tuần 1 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse1Example">
                    <div class="card card-body">
                        <workingWeekComponent :month="month" :work-week="calendrier.tuan1"
                            :idweek="[1, 2, 3, 4, 5, 6, 7]">
                        </workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse2Example" aria-expanded="false" aria-controls="collapse2Example">
                    Lịch làm việc tuần 2 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse2Example">
                    <div class="card card-body">
                        <workingWeekComponent :month="month" :work-week="calendrier.tuan2"
                            :idweek="[8, 9, 10, 11, 12, 13, 14]">
                        </workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse3Example" aria-expanded="false" aria-controls="collapse3Example">
                    Lịch làm việc tuần 3 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse3Example">
                    <div class="card card-body">
                        <workingWeekComponent :month="month" :work-week="calendrier.tuan3"
                            :idweek="[15, 16, 17, 18, 19, 20, 21]">
                        </workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div>
                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse4Example" aria-expanded="false" aria-controls="collapse4Example">
                        Lịch làm việc tuần 4 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                    </button>
                    <div class="collapse" id="collapse4Example">
                        <div class="card card-body">
                            <workingWeekComponent :month="month" :work-week="calendrier.tuan4"
                                :idweek="[22, 23, 24, 25, 26, 27, 28]">
                            </workingWeekComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse5Example" aria-expanded="false" aria-controls="collapse5Example">
                    Lịch làm việc tuần 5 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse5Example">
                    <div class="card card-body">
                        <workingWeekComponent :month="month" :work-week="calendrier.tuan5"
                            :idweek="[29, 30, 31, '', '', '', '']">
                        </workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="button-scroll">
                <button class="btn btn-outline-secondary rounded-circle" @click="scrollToTop">
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import moment from 'moment';
import workingWeekComponent from '@/components/workingWeekComponent.vue';

import calendrierService from '@/services/calendrier.service';
export default {
    components: {
        workingWeekComponent,
    },

    setup() {
        const formatDate = (date) => {
            return moment(new Date(date)).format('DD/MM/YYYY');
        }

        return {
            formatDate,
        };
    },

    data() {
        return {
            phase: '1',
            calendrier: {},
            phaseList: [],
            month: 1,
        };
    },

    async created() {
        try {
            this.phaseList = await calendrierService.GetPhase();
            await this.fetchData();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async fetchData() {
            try {
                this.calendrier = await calendrierService.FindOneByPhase(this.phase);

                this.phaseList.forEach(element => {
                    if (element.idgiaidoan == this.phase) {
                        this.month = (new Date(element.ngaybatdau).getMonth()) + 1;
                    }
                });
            } catch (error) {
                console.log(error);
                this.calendrier = [];
            }
        },

        async onPhases() {
            await this.fetchData();
        }
    }
}
</script>

<style scoped>
.button-scroll {
    position: fixed;
    bottom: 10px;
    right: 20px;
}
</style>