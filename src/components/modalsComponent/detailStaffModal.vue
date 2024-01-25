<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin nhân viên</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row" style="min-height: 500px;">
                    <div class="col-md-4 col-12">
                        <img src="https://image.phunuonline.com.vn/fckeditor/upload/2022/20220815/images/4176_3-2.jpg"
                            alt="" class="w-100 rounded-5 pt-2">
                        <h6 class="text-center fw-bold mt-2">MS: 23</h6>
                        <h5 class="text-center fw-bold mt-2"> Dương Hãi Băng</h5>
                        <span class="status-success text-center">Đang làm việc</span>
                    </div>
                    <div class="col-md-8 col-12">
                        <ul class="pt-3">
                            <li><span class="fw-bold">Họ và tên:</span> DươngHãi Băng</li>
                            <li><span class="fw-bold">Ngày sinh:</span> 06/07/2002</li>
                            <li><span class="fw-bold">Giới tính:</span> Nam</li>
                            <li><span class="fw-bold">Thẻ căn cước:</span>700980825354</li>
                            <li><span class="fw-bold">Nơi cư trú:</span> 124/11A đường 3/2,
                                phường Xuân Khánh, quận Ninh Kiều, Tp. Cần Thơ</li>
                            <li><span class="fw-bold">Số điện thoại:</span> 0985734334</li>
                            <li><span class="fw-bold">Ngày bắt đầu:</span>23/12/2023</li>
                            <li><span class="fw-bold">Chức vụ:</span> Phục vụ</li>
                            <li>
                                <span class="fw-bold">Hình thức trả lương:</span> tháng
                                <router-link :to="{ name: 'salary-page' }" style="text-decoration: none;">
                                    (xem lương)
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: {
            required: true,
            type: Number,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }
        return { closeModal };
    },
}
</script>
<style  scoped lang="css">
.modalBooking {
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-booking-content {
    background-color: white;
    width: 60%;
    margin: 50px 0px 50px 0px;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
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

.status-success {
    display: inline-block;
    width: 100%;
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.status-wait {
    padding: 3px 8px;
    background-color: rgba(193, 193, 2, 0.784);
    border-radius: 15px;
}

ul>li {
    list-style: none;
    margin-top: 8px;
}
</style>