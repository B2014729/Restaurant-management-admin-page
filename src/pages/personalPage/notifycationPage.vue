<template>
    <div class="p-3">
        <createBookingModal v-if="modalCreateBookingActive" @close="toggelModalCreateBooking"
            @onActive="createBooking($event)">
        </createBookingModal>
        <div class="d-flex justify-content-between mb-2">
            <div>
                <h4 class="text-secondary fw-bold">Thông báo đặt bàn:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'evalues-page' }">
                        <span> Đặt bàn</span>
                    </router-link>
                </div>
            </div>
            <button class="btn btn-outline-success h-75" @click="toggelModalCreateBooking"><i
                    class="fa-solid fa-plus"></i>
                Tạo đặt bàn
            </button>
        </div>
        <alertMessage v-if="showAlert" :message="messageAlert" :status="status"></alertMessage>
        <div class="row">
            <div class="col-md-4 col-12">
                <h6 class="text fw-bold ms-3 mt-3" style="font-size: 18px;">Sắp diển ra:</h6>
            </div>
            <div class="col-md-8 col-12 d-flex justify-content-end">
                <searchComponent class="w-50" @submit="search($event)" v-model="searchTextUpcoming">
                </searchComponent>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <div class="w-100">
                <notifycationCard v-for="(item, index) in searchBookingUpcoming" :key="index" :idbooking=item.iddatban
                    @UpdateStatus="showAlertMessage($event)">
                </notifycationCard>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4 col-12">
                <h6 class="text fw-bold ms-3 mt-3" style="font-size: 18px;">Lịch sử đặt bàn:
                    <button class="btn" v-if="!showHistory" @click="onToggleShowHistory"><i
                            class="fa-solid fa-chevron-down"></i></button>
                    <button class="btn" v-else @click="onToggleShowHistory"><i
                            class="fa-solid fa-chevron-up"></i></button>
                </h6>
            </div>
            <div class="col-md-8 col-12 d-flex justify-content-end">
                <searchComponent class="w-50" @submit="search($event)" v-model="searchTextHistory">
                </searchComponent>
            </div>
        </div>
        <div v-if="showHistory" class="d-flex justify-content-center">
            <div class="w-100">
                <notifycationCard v-for="(item, index) in searchBookingHistory" :key="index" :idbooking=item.iddatban>
                </notifycationCard>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import createBookingModal from '@/components/modalsComponent/createBookingModal.vue';
import notifycationCard from '@/components/notifycationCard.vue';
import bookingService from '@/services/booking.service';
import searchComponent from '@/components/searchComponent.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';

export default {
    components: {
        notifycationCard, searchComponent, alertMessage, createBookingModal
    },

    computed: {
        listBookingsUpcomingString() {
            return this.listBookingsUpcoming.map((booking) => {
                const { hotenkhachhang, sodienthoai, tendangnhap } = booking.thongtinkhachhang;
                return [hotenkhachhang, sodienthoai, tendangnhap].join("");
            });
        },

        searchBookingUpcoming() {
            if (!this.searchTextUpcoming) {
                return this.listBookingsUpcoming
            }
            return this.listBookingsUpcoming.filter((_booking, index) => {
                return this.listBookingsUpcomingString[index].includes(this.searchTextUpcoming);
            });
        },

        listBookingsHistoryString() {
            return this.listBookingsHistory.map((booking) => {
                const { hotenkhachhang, sodienthoai, tendangnhap } = booking.thongtinkhachhang;
                return [hotenkhachhang, sodienthoai, tendangnhap].join("");
            });
        },

        searchBookingHistory() {
            if (!this.searchTextHistory) {
                return this.listBookingsHistory
            }
            return this.listBookingsHistory.filter((_booking, index) => {
                return this.listBookingsHistoryString[index].includes(this.searchTextHistory);
            });
        }
    },

    setup() {
        let messageAlert = ref('');
        let showAlert = ref(false);
        let status = ref('');
        let showHistory = ref(false);

        let modalCreateBookingActive = ref(false);

        const toggelModalCreateBooking = () => {
            modalCreateBookingActive.value = !modalCreateBookingActive.value;
        }

        const onToggleShowHistory = () => {
            showHistory.value = !showHistory.value;
        }

        return {
            messageAlert, showAlert, status, modalCreateBookingActive, toggelModalCreateBooking, showHistory, onToggleShowHistory
        };
    },


    data() {
        return {
            dateNow: new Date(),
            listBooking: [],
            listBookingsUpcoming: [],
            listBookingsHistory: [],
            searchTextUpcoming: '',
            searchTextHistory: '',
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            this.listBooking = [];
            this.listBookingsUpcoming = [];
            this.listBookingsHistory = [];
            try {
                this.listBooking = await bookingService.FindAll();
                if (this.listBooking.length > 0) {
                    this.listBooking.forEach(element => {
                        let date = new Date(element.ngaygio);
                        if (date > this.dateNow) {
                            this.listBookingsUpcoming.push(element);
                        } else {
                            this.listBookingsHistory.push(element);
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },

        search(data) {
            console.log(data);
        },

        showAlertMessage(data) {
            if (data) {
                this.status = 'success';
                this.messageAlert = 'Đã xác nhận thông tin đặt bàn!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            } else {
                this.status = 'danger';
                this.messageAlert = 'Xác nhận thông tin đặt bàn không thành công!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            }
        },

        async createBooking(data) {
            this.modalCreateBookingActive = false;
            try {
                data.token = '';
                data.staff = this.$store.state.user.token;   //id nhan vien tao 

                let resultAdd = await bookingService.Create(data);
                if (resultAdd.statusCode == 200) {
                    await this.fetchData();
                    this.showAlert = true;
                    this.messageAlert = 'Đã thêm đặt bàn mới!';
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                    this.status = 'success';
                    data = {};

                } else {
                    this.showAlert = true;
                    this.messageAlert = 'Lỗi khi thêm đặt bàn!';
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                    this.status = 'danger';
                }
            } catch (error) {
                this.showAlert = true;
                this.messageAlert = 'Error when booking your table';
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                this.status = 'danger';
                console.log(error);
            }
        }
    }
}
</script>