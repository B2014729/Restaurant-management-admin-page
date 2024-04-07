<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-end">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold text-dark">Thay đổi thông tin tài khoản</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr class="text-dark">
                <div class="text-start text-dark mt-0">
                    <form>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="username" v-model="data.username">
                            <label for="username">*Tên đăng nhập:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" id="password" v-model="data.password">
                            <label for="password">*Mật khẩu:</label>
                        </div>
                        <div v-if="errorPasswordWrong" class="my-2 w-100 d-flex justify-content-end">
                            <span class="text-danger" style="font-size: 13px;">
                                <i class="fa-solid fa-triangle-exclamation text-danger"></i>
                                Mật khẩu không đúng!
                            </span>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" id="passwordNew" v-model="data.passwordNew">
                            <label for="passwordNew">*Mật khẩu mới:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="password" class="form-control" id="passwordConfirm"
                                v-model="data.passwordConfirm">
                            <label for="passwordConfirm">*Xác nhận mật khẩu:</label>
                        </div>
                        <div v-if="errorConfirmPassword" class="my-2 w-100 d-flex justify-content-end">
                            <span class="text-danger" style="font-size: 13px;">
                                <i class="fa-solid fa-triangle-exclamation text-danger"></i>
                                Xác nhận mật khẩu không hợp lệ!
                            </span>
                        </div>
                    </form>
                </div>
                <div v-if="errorDataEmpty" class="my-2 w-100 d-flex justify-content-end">
                    <span class="text-danger" style="font-size: 13px;">
                        <i class="fa-solid fa-triangle-exclamation text-danger"></i>
                        Vui lòng nhập đầy đủ thông tin để cập nhật!
                    </span>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-outline-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onActive">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import accountService from '@/services/account.service.js';

export default {
    setup() {
        let errorConfirmPassword = ref(false);
        let errorPasswordWrong = ref(false);
        let errorDataEmpty = ref(false);

        return { errorConfirmPassword, errorPasswordWrong, errorDataEmpty };
    },

    data() {
        return {
            data: {},
        }
    },

    created() {
        this.data = {
            username: this.$store.state.user.tendangnhap,
            password: '',
            passwordNew: '',
            passwordConfirm: '',
        }
    },

    methods: {
        closeModal() {
            this.$emit('close');
        },

        async onActive() {
            try {
                if (!this.data.password || !this.data.passwordConfirm || !this.data.passwordNew) {
                    this.errorDataEmpty = true;
                } else {
                    this.errorDataEmpty = false;
                    let resultcheck = await accountService.CheckPass(this.$store.state.user.token, this.data.password);
                    if (resultcheck.statusCode != 200) {
                        this.errorPasswordWrong = true;
                    } else {
                        this.errorPasswordWrong = false;
                        if (this.data.passwordConfirm != this.data.passwordNew) {
                            this.errorConfirmPassword = true;
                        } else {
                            this.errorConfirmPassword = false;
                        }
                    }
                }

                if (!this.errorDataEmpty && !this.errorConfirmPassword && !this.errorPasswordWrong) {
                    this.$emit('onActive', {
                        username: this.data.username,
                        password: this.data.passwordNew,
                        token: this.$store.state.user.token,
                    });
                }
            }
            catch (error) {
                console.log(error);
                this.errorPasswordWrong = true;
            }
        }
    }
}
</script>

<style scoped lang="css">
.modalBill {
    padding-right: 10px;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {

    background-color: white;
    width: 23%;
    height: 60%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
    margin-top: 50px;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 50px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>d