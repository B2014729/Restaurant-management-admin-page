<template>
    <header class=" d-flex align-items-end justify-content-between">
        <confirmModal v-if="modalActive" :message="message" @close="toggleModal" @onActive="onLogout">
        </confirmModal>
        <h5 class="text-secondary fw-bold">Dashboard</h5>
        <div class="mb-2 d-flex">
            <div class="d-flex align-items-center">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                        aria-describedby="button-addon2" name="input">
                    <button class="btn" type="button" id="button-addon2"><i
                            class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div class="d-flex align-items-center mx-3">
                <router-link class="dropdown-item text-dark" :to="{ name: 'notifycation-page' }">
                    <button class="btn" style="position: relative;">
                        <i class="fa-solid fa-bell text-secondary fs-5"></i>
                        <span class="number-bell">{{ notificationCount }}</span>
                    </button>
                </router-link>
            </div>
            <div class="dropdown d-flex align-items-center">
                <button class="btn btn-secondary rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="fa-solid fa-user"></i>
                </button>
                <span class="ms-2 pt-1  text-success">{{ username }}</span>
                <ul class="dropdown-menu">
                    <li>
                        <router-link class="dropdown-item text-dark" :to="{ name: 'notifycation-page' }">
                            <i class="fa-solid fa-bell m-1"></i> Thông báo
                        </router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item text-dark" :to="{ name: 'personal-page' }">
                            <i class="fa-solid fa-circle-info me-1"></i> Cá nhân
                        </router-link>
                    </li>
                    <li>
                        <a class="dropdown-item text-dark" @click="toggleModal">
                            <i class="fa-solid fa-right-from-bracket  me-1"></i>
                            Đăng xuất
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
import { ref } from 'vue';
import { io } from "socket.io-client";
import confirmModal from './modalsComponent/confirmModal.vue';
import bookingService from '@/services/booking.service';
export default {
    name: 'HeaderComponent',

    components: {
        confirmModal
    },

    setup() {
        let modalActive = ref(false);
        let message = "Bạn muốn đăng xuất?";

        const toggleModal = () => {
            modalActive.value = !modalActive.value;
        }

        return {
            modalActive, message, toggleModal
        };
    },

    data() {
        return {
            username: this.$store.state.user.tendangnhap,
            notificationCount: 0,
        };
    },

    async created() {
        await this.fetchData();
        const socket = io('http://localhost:8000');

        //socket.emit('Fordisconnect');
        await socket.on('bookingSuccess', () => {
            this.fetchData();
        })
    },

    methods: {
        async fetchData() {
            this.notificationCount = 0;
            try {
                let resultListBooking = await bookingService.FindAll();
                resultListBooking.forEach(element => {
                    if (element.trangthai == 0) {
                        this.notificationCount++;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        onLogout() {
            this.modalActive = false;
            this.$cookies.remove('jwt');
            this.$store.dispatch('user', null);
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
header {
    height: 50px;

}

input {
    border: none;
    border-radius: none;
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.dropdown-menu li {
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.dropdown .dropdown-menu .dropdown-item:hover,
.dropdown .dropdown-menu .dropdown-item:focus {
    background-color: #bebebe !important;
    color: black;
}

.active {
    background-color: #bebebe !important;
}

.number-bell {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: #c00101;
    border-radius: 50%;
    padding-top: 1px;
    font-size: 10px;
    font-weight: bold;
    color: white;
    position: absolute;
    left: 20px;
    top: 2px;
    align-items: center;
}
</style>
