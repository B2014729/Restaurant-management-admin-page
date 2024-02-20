<template>
    <div class="p-3">
        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <createPhaseModal v-if="modalActive" @close="toggleModal" @onActive="submit($event)">
        </createPhaseModal>
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <h4 class="text-secondary fw-bold">Sắp xếp lịch làm việc__:</h4>

                <div class="ms-4 d-flex">
                    <select class="form-select" aria-label="Default select example" v-model="phase">
                        <option v-for="(item, index) in phaseList" :key="index" :value="item.idgiaidoan">
                            {{ item.ngaybatdau }} - {{ item.ngayketthuc }}
                        </option>
                    </select>
                    <button class="btn" @click="onChangePhases"><i class="fa-solid fa-check text-success"></i></button>
                </div>
            </div>
            <button class="btn btn-outline-success h-100" @click="toggleModal"><i class="fa-solid fa-plus"></i></button>
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
                    Danh sách đăng kí lịch làm tuần 1 <i class="fa-solid fa-chevron-down ms-2"
                        style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse1Example">
                    <div class="card card-body">
                        <arrangeWorkComponent :work-week="calendrier.tuan1" :idweek="[1, 2, 3, 4, 5, 6, 7]"
                            :idWorkCalendrier="idWorkCalendrier[0]">
                        </arrangeWorkComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse2Example" aria-expanded="false" aria-controls="collapse2Example">
                    Danh sách đăng kí lịch làm tuần 2 <i class="fa-solid fa-chevron-down ms-2"
                        style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse2Example">
                    <div class="card card-body">
                        <arrangeWorkComponent :arrange="true" :work-week="calendrier.tuan2"
                            :idweek="[8, 9, 10, 11, 12, 13, 14]" :idWorkCalendrier="idWorkCalendrier[1]">
                        </arrangeWorkComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse3Example" aria-expanded="false" aria-controls="collapse3Example">
                    Danh sách đăng kí lịch làm tuần 3 <i class="fa-solid fa-chevron-down ms-2"
                        style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse3Example">
                    <div class="card card-body">
                        <arrangeWorkComponent :arrange="true" :work-week="calendrier.tuan3"
                            :idweek="[15, 16, 17, 18, 19, 20, 21]" :idWorkCalendrier="idWorkCalendrier[2]">
                        </arrangeWorkComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div>
                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse4Example" aria-expanded="false" aria-controls="collapse4Example">
                        Danh sách đăng kí lịch làm tuần 4 <i class="fa-solid fa-chevron-down ms-2"
                            style="font-size: 12px;"></i>
                    </button>
                    <div class="collapse" id="collapse4Example">
                        <div class="card card-body">
                            <arrangeWorkComponent :arrange="true" :work-week="calendrier.tuan4"
                                :idweek="[22, 23, 24, 25, 26, 27, 28]" :idWorkCalendrier="idWorkCalendrier[3]">
                            </arrangeWorkComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse5Example" aria-expanded="false" aria-controls="collapse5Example">
                    Danh sách đăng kí lịch làm tuần 5 <i class="fa-solid fa-chevron-down ms-2"
                        style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse5Example">
                    <div class="card card-body">
                        <arrangeWorkComponent :arrange="true" :work-week="calendrier.tuan5"
                            :idweek="[29, 30, 31, '', '', '', '']" :idWorkCalendrier="idWorkCalendrier[4]">
                        </arrangeWorkComponent>
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
import { ref } from 'vue';
import arrangeWorkComponent from '@/components/arrangeWorkComponent.vue';
import createPhaseModal from '@/components/modalsComponent/createPhaseModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import calendrierService from '@/services/calendrier.service';
export default {
    components: {
        arrangeWorkComponent,
        createPhaseModal,
        alertMessage
    },

    setup() {
        let modalActive = ref(false);
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        }
        return {
            modalActive, toggleModal, showAlert, status, messageAlert,
        };
    },

    data() {
        return {
            phase: '1',
            calendrier: [],
            phaseList: [],
            idWorkCalendrier: [],
        };
    },

    async created() {
        await this.fetchData();
        this.phaseList = await calendrierService.GetPhase();

        if (this.phaseList.length != 0) {
            this.phaseList.forEach((element) => {
                element.ngaybatdau = moment(element.ngaybatdau).format("DD/MM/YYYY");
                element.ngayketthuc = moment(element.ngayketthuc).format("DD/MM/YYYY");
            });
        }
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async fetchData() {
            try {
                this.calendrier = await calendrierService.FindOneArrangeByPhase(this.phase);
                if (this.calendrier.tuan1.length > 0) {
                    this.idWorkCalendrier[0] = this.calendrier.tuan1[0].idlichlamviec;
                } else {
                    this.idWorkCalendrier[0] = 0;
                }
                if (this.calendrier.tuan2.length > 0) {
                    this.idWorkCalendrier[1] = this.calendrier.tuan2[0].idlichlamviec;
                } else {
                    this.idWorkCalendrier[1] = 0;
                }
                if (this.calendrier.tuan3.length > 0) {
                    this.idWorkCalendrier[2] = this.calendrier.tuan3[0].idlichlamviec;
                } else {
                    this.idWorkCalendrier[2] = 0;
                }
                if (this.calendrier.tuan4.length > 0) {
                    this.idWorkCalendrier[3] = this.calendrier.tuan4[0].idlichlamviec;
                } else {
                    this.idWorkCalendrier[3] = 0;
                }
                if (this.calendrier.tuan5.length > 0) {
                    this.idWorkCalendrier[4] = this.calendrier.tuan5[0].idlichlamviec;
                } else {
                    this.idWorkCalendrier[4] = 0;
                }
            } catch (error) {
                this.calendrier = [];
                console.log(error);
            }
        },

        async onChangePhases() {
            await this.fetchData();
        },

        async submit(data) {
            try {
                await calendrierService.CreatePhase(data.startdate, data.enddate).then((result) => {
                    if (result.statusCode == 200) {
                        this.modalActive = false;
                        this.messageAlert = 'Đã thêm một giai đoạn mới!';
                        this.status = 'success';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    } else {
                        this.modalActive = false;
                        this.messageAlert = 'Thêm giai đoạn mới không thành công!';
                        this.status = 'warning';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                    }
                })
            } catch (error) {
                this.modalActive = false;
                this.messageAlert = 'Lỗi trong khi thêm giai đoạn mới!';
                this.status = 'danger';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(error);
            }
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