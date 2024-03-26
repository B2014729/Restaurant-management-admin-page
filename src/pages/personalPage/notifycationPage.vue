<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Thông báo đặt bàn__:</h4>
        <div class="d-flex justify-content-center">
            <div class="w-100">
                <notifycationCard v-for="(item, index) in listBooking" :key="index" :idbooking=item.iddatban>
                </notifycationCard>
            </div>
        </div>
    </div>
</template>

<script>
import notifycationCard from '@/components/notifycationCard.vue';
import bookingService from '@/services/booking.service';
export default {

    components: {
        notifycationCard,
    },

    data() {
        return {
            listBooking: {},
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listBooking = await bookingService.FindAll();
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>