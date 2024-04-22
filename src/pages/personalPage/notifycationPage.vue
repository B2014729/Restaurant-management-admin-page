<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Thông báo đặt bàn:</h4>
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
                <notifycationCard v-for="(item, index) in searchBookingUpcoming" :key="index" :idbooking=item.iddatban>
                </notifycationCard>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-4 col-12">
                <h6 class="text fw-bold ms-3 mt-3" style="font-size: 18px;">Lịch sử đặt bàn:</h6>
            </div>
            <div class="col-md-8 col-12 d-flex justify-content-end">
                <searchComponent class="w-50" @submit="search($event)" v-model="searchTextHistory">
                </searchComponent>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="w-100">
                <notifycationCard v-for="(item, index) in searchBookingHistory" :key="index" :idbooking=item.iddatban>
                </notifycationCard>
            </div>
        </div>
    </div>
</template>

<script>
import notifycationCard from '@/components/notifycationCard.vue';
import bookingService from '@/services/booking.service';
import searchComponent from '@/components/searchComponent.vue';

export default {
    components: {
        notifycationCard, searchComponent
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
        }
    }
}
</script>