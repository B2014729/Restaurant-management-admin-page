<template>
    <div class="body container-fluid">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto form-content">
                <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body py-4">
                        <h3 class="card-title text-center mb-5 fw-bold">BEACH RESTAURANT</h3>
                        <form @submit.prevent="submit">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control"
                                    style="background-color: rgba(240, 248, 255, 0);" id="floatingInput"
                                    placeholder="ksksk" v-model="data.username">
                                <label for="floatingInput"><i class="fa-solid fa-user"></i> Tên đăng nhập</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control"
                                    style="background-color: rgba(240, 248, 255, 0);" id="floatingPassword"
                                    placeholder="Password" v-model="data.password">
                                <label for="floatingPassword"><i class="fa-solid fa-lock"></i> Mật khẩu</label>
                            </div>
                            <div v-if="errorNotifycation" class="w-100 d-flex justify-content-end">
                                <span class="text-warning" style="font-size: 13px;">
                                    Vui lòng kiểm tra thông tin đăng nhập!
                                </span>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                                <label class="form-check-label" for="rememberPasswordCheck">
                                    Nhớ mật khẩu
                                </label>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-login text-uppercase fw-bold" type="submit">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import accountService from '@/services/account.service';
import staffService from '@/services/staff.service';

export default {
    setup() {
        let errorNotifycation = ref(false);
        return { errorNotifycation };
    },

    data() {
        return {
            data: {},
        };
    },

    async created() {
        //console.log(this.$store.state.user);
        try {
            let token = this.$cookies.get('jwt');
            if (token != null) {
                let user = await staffService.FindOneByToken(token);
                if (Object.keys(user) != 0) {
                    if (user.quyen == 5) {
                        this.$store.dispatch('user', {
                            token: token,
                            quyentruycap: user.quyen,
                            tendangnhap: user.tendangnhap,
                        })
                        this.$router.push('/trang-chu');
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        async submit() {
            try {
                if (!this.data.username || !this.data.password) {
                    this.errorNotifycation = true;
                } else {
                    this.errorNotifycation = false;
                    await accountService.Login(this.data).then((result) => {
                        if (result.status == 200) {
                            if (result.data.data[0].quyen != 5) {
                                this.errorNotifycation = true;
                            } else {
                                this.$cookies.set('jwt', result.headers.authorization);
                                this.$store.dispatch('user',
                                    {
                                        token: result.headers.authorization,
                                        tendangnhap: result.data.data[0].tendangnhap,
                                        quyentruycap: result.data.data[0].quyen,
                                    });
                                // console.log(this.$store.state.user);
                                this.$router.push('/trang-chu');
                            }
                        }
                    });
                }
            } catch (error) {
                this.errorNotifycation = true;
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.body {
    min-height: 729px;
    background-image: url('https://img.freepik.com/premium-photo/3d-abstract-background_493604-1338.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.form-content {
    margin-top: 100px;
    width: 500px;
}

.card {
    background-color: rgba(28, 28, 28, 0.248);
}


.btn-login {
    color: white;
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
    background-color: rgba(1, 33, 33, 0.868);
}
</style>