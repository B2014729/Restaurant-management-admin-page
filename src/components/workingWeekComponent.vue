<template>
    <div>

        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Nhân viên</th>
                    <th v-for="(item, index) in idweek" :key="index" scope="col" class="text-center" style="width:125px">
                        {{ item }}
                    </th>
                    <th scope="col" class="text-center">Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in workWeek" :key="index">
                    <th scope="row" class="text-center align-middle">{{ item.tennhanvien }}</th>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay1"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay2"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay3"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay4"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay5"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay6"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="item.ngay7"></workingWeekCard>
                    </td>
                    <td class="text-center">{{ item.chucvu }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import workingWeekCard from "@/components/workingWeekCard.vue";
export default {

    components: {
        workingWeekCard,
    },

    props: {
        workWeek: {
            type: Array,
        },
        idweek: {
            type: Array,
        }
    },

}
</script>
<style scoped></style>