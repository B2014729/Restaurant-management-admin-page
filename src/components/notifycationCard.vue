<template>
    <detailBookingModal v-if="modalActive" :id="idbooking" @close="toggleModalDetail"
        @onActive="confirmBooking($event)">
    </detailBookingModal>
    <div>
        <div class="border border-2 rounded-3 mb-2">
            <div class="my-2 row">
                <div class="col-2 ps-4 mt-2">
                    <span class="text-success fw-bold">Đặt bàn mới</span>
                </div>
                <div class="col-2 ps-4 mt-2">
                    <span>KH: {{ customerInfor.hotenkhachhang }}</span>
                </div>
                <div class="col-3 ps-4 mt-2">
                    <span class="fw-bold">Time: {{ formatDateTime(booking.ngaygio) }}</span>
                </div>
                <div class="col-2 ps-4 mt-2">
                    <span>Số người: {{ booking.soluongnguoi }}</span>
                </div>
                <div class="col-2 ps-4 mt-2">
                    <span v-if="booking.trangthai == 1" class="text-success fw-bold">Đã xác nhận</span>
                    <span v-else class="text-danger fw-bold">Chờ xác nhận</span>
                </div>
                <div class="col-1">
                    <button class="btn btn-outline-success border" @click="toggleModalDetail"><i
                            class="fa-solid fa-circle-info"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import detailBookingModal from '@/components/modalsComponent/detailBookingModal.vue';
import bookingService from '@/services/booking.service';
import { ref } from 'vue';
export default {
    components: {
        detailBookingModal,
    },

    props: {
        idbooking: {
            type: Number,
        },
    },

    emits: ['UpdateStatus'],

    setup() {
        let modalActive = ref(false);

        const toggleModalDetail = () => {
            modalActive.value = !modalActive.value;
        }

        function formatDateTime(date) {
            let newDate = new Date(date);
            let hours = newDate.getHours() >= 10 ? newDate.getHours() : `0${newDate.getHours()}`;
            let minutes = newDate.getMinutes() >= 10 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;
            let seconds = newDate.getSeconds() >= 10 ? newDate.getSeconds() : `0${newDate.getSeconds()}`;
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${hours}:${minutes}:${seconds}, ${dateIn}/${month}/${year}`;
        }


        return {
            modalActive, toggleModalDetail, formatDateTime
        }
    },

    data() {
        return {
            booking: {},
            customerInfor: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.booking = await bookingService.FindOneById(this.idbooking);
                this.customerInfor = this.booking.thongtinkhachhang
            } catch (error) {
                console.log(error);
            }
        },

        async confirmBooking(data) {
            this.modalActive = false;
            console.log(data);
            try {
                await bookingService.Confirm(data.idBooking, data.status, data.idTable).then((result) => {
                    if (result.statusCode == 200) {
                        this.fetchData();
                        this.$emit('UpdateStatus', true);
                    }
                })
            } catch (error) {
                this.$emit('UpdateStatus', false);
                console.log(error);
            }
        }
    }
}
</script>
<style scoped></style>