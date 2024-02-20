<template>
    <div>
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

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
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay1">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay2">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay3">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay4">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay5">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay6">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">
                        <select style="font-size: 10px;" class="form-select" v-model="item.ngay7">
                            <option value="1">
                                <workingWeekCard :id="1"></workingWeekCard>
                            </option>
                            <option value="2">
                                <workingWeekCard :id="2"></workingWeekCard>
                            </option>
                            <option value="3">
                                <workingWeekCard :id="3"></workingWeekCard>
                            </option>
                            <option value="4">
                                <workingWeekCard :id="4"></workingWeekCard>
                            </option>
                            <option value="5">
                                <workingWeekCard :id="5"></workingWeekCard>
                            </option>
                            <option value="6">
                                <workingWeekCard :id="6"></workingWeekCard>
                            </option>
                            <option value="0">
                                <workingWeekCard :id="0"></workingWeekCard>
                            </option>
                        </select>
                    </td>
                    <td class="text-center">{{ item.chucvu }}</td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex  justify-content-end"> <button class="btn btn-success" @click="submit">Lưu</button></div>
    </div>
</template>

<script>
import { ref } from 'vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import calendrierService from '@/services/calendrier.service';
import workingWeekCard from './workingWeekCard.vue';

export default {
    components: {
        workingWeekCard, alertMessage,
    },
    props: {
        workWeek: {
            type: Array,
        },

        idweek: {
            type: Array,
        },

        idWorkCalendrier: {
            type: Number,
        }
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');
        return {
            showAlert, status, messageAlert
        };
    },

    methods: {
        async submit() {
            this.workWeek.forEach((element) => {
                element.ngay1 = Number(element.ngay1);
                element.ngay2 = Number(element.ngay2);
                element.ngay3 = Number(element.ngay3);
                element.ngay4 = Number(element.ngay4);
                element.ngay5 = Number(element.ngay5);
                element.ngay6 = Number(element.ngay6);
                element.ngay7 = Number(element.ngay7);
            });
            try {
                await calendrierService.CreateWorkCalendrier(this.workWeek).then((result) => {
                    if (result.statusCode == 200) {
                        this.messageAlert = 'Đã cập nhật lịch làm việc!';
                        this.status = 'success';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    } else {
                        this.messageAlert = 'Lỗi khi cập nhật lịch làm việc của nhân viên!';
                        this.status = 'danger';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    }
                });

            } catch (error) {
                console.log(error);
                this.messageAlert = 'Lỗi khi cập nhật lịch làm việc của nhân viên!';
                this.status = 'danger';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }

        }
    }
}
</script>
<style scoped></style>