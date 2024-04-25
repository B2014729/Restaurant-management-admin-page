<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thêm mới đặt bàn
                        </h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <form @submit.prevent="{ }">
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="form-floating mb-2">
                                <input type="date" class="form-control" id="date" v-model="data.date">
                                <label for="date">*Ngày:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="time" class="form-control" id="time" v-model="data.time">
                                <label for="time">*Giờ:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="quantity" v-model="data.quantity">
                                <label for="quantity">*Số người:</label>
                            </div>
                        </div>
                        <div class="col-md-6 col-12">
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="name" v-model="data.name">
                                <label for="name">*Tên khách hàng:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="phone" v-model="data.phone">
                                <label for="phone">*Số điện thoại:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="email" class="form-control" id="mail" v-model="data.mail">
                                <label for="mail">*E-mail:</label>
                            </div>
                        </div>
                        <div class="form-floating mb-2">
                            <textarea type="text" class="form-control" id="address" v-model="data.note"
                                style="height: 100px;"></textarea>
                            <label for="address" class="ms-3">*Ghi chú:</label>
                        </div>
                    </div>
                    <span v-if="errorMessage" class="text-end text-warning" style="font-size: 14px;">
                        <i class="fa-solid fa-triangle-exclamation"></i> Vui lòng nhập đầy đủ thông tin nhân
                        viên!
                    </span>
                    <div class="d-flex justify-content-end mt-auto w-100">
                        <div>
                            <button type="submit" class="btn btn-success ms-2 mt-3" @click="onActive">Thêm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    setup(props, context) {
        let errorMessage = ref(false);

        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal, errorMessage };
    },

    data() {
        return {
            data: {},
        };
    },

    methods: {
        onActive() {
            if (!this.data.phone || !this.data.name || !this.data.date || !this.data.time || !this.data.quantity) {
                this.errorMessage = true;
            } else {
                this.errorMessage = true;
                this.$emit('onActive', this.data);
            }
        }
    }
}
</script>
<style scoped lang="css">
.modalBill {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {
    background-color: white;
    width: 45%;
    height: 66%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 0px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>