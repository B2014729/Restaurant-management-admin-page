<template>
    <div>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Nhân viên {{ id }}</th>
                    <th v-for="(item, index) in idweek" :key="index" scope="col" class="text-center"
                        style="width:125px">
                        {{ item }}/{{ month }}
                    </th>
                    <th scope="col" class="text-center">Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <th scope="row" class="text-center align-middle">{{ item.tennhanvien }}</th>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay1 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay1 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay1 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay1 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay1 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay1 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay2 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay2 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay2 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay2 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay2 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay2 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay3 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay3 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay3 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay3 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay3 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay3 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay4 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay4 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay4 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay4 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay4 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay4 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay5 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay5 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay5 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay5 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay5 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay5 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay6 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay6 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay6 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay6 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay6 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay6 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">
                        <span style="font-size: 14px;" class="card-day morning" v-if="item.ngay7 == 1">
                            6:00 - 12:00</span>
                        <span style="font-size: 14px;" class="card-day afternoon" v-if="item.ngay7 == 2">
                            12:00 - 18:00</span>
                        <span style="font-size: 14px;" class="card-day evening" v-if="item.ngay7 == 3">18:00 -
                            00:00</span>
                        <span style="font-size: 14px;" class="card-day full" v-if="item.ngay7 == 4">06:00 - 00:00</span>
                        <span style="font-size: 14px;" class="card-day morningAndAfter" v-if="item.ngay7 == 5">06:00 -
                            18:00</span>
                        <span style="font-size: 14px;" class="card-day afterAndEvening" v-if="item.ngay7 == 6">12:00 -
                            00:00</span>
                    </td>
                    <td class="text-center">{{ item.chucvu }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { ref } from 'vue';
//import workingWeekCard from "@/components/workingWeekCard.vue";
// import calendrierService from "@/services/calendrier.service";
export default {

    components: {
        // workingWeekCard,
    },

    props: {
        workWeek: {
            type: Array,
        },

        idweek: {
            type: Array,
        },

        month: {
            type: Number
        },
    },

    setup() {
        let id = ref(0);
        let data = ref([]);
        return { data, id }

    },

    watch: {
        workWeek: function (newVal, oldVal) { // watch it
            if (newVal != oldVal) {
                this.data = newVal;
                this.id = newVal.length;
            }
        }
    },



    async created() {
        this.data = this.workWeek;
        console.log(this.workWeek);
    },

    // methods: {
    //     async fetchData() {
    //         try {
    //             this.data = await calendrierService.FindAllWithIdCalendrier(this.idWorkCalendrier);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
}
</script>
<style scoped>
.card-day {
    padding: 3px 6px;
}

.morning {
    background-color: rgba(0, 128, 0, 0.692);
}

.afternoon {
    background-color: rgba(255, 166, 0, 0.645);
}

.evening {
    background-color: rgba(0, 0, 0, 0.982);
    color: grey;
}

.full {
    background-color: rgba(255, 0, 0, 0.708);
}

.morningAndAfter {
    background-color: rgba(0, 0, 255, 0.701);
}

.afterAndEvening {
    background-color: rgba(128, 128, 128, 0.859);
}
</style>