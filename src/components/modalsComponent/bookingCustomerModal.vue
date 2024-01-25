<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin khách hàng {{ idBill }}</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 col-12">
                        <span><span class="fw-bold">Mã khách hàng: </span> 2335664</span>
                        <p><span class="fw-bold">Họ tên khách hàng: </span> Dương Hãi Băng</p>
                    </div>

                    <div class="col-md-6 col-12">
                        <span><span class="fw-bold">Số điện thoại: </span> 0957789393 </span>
                        <p><span class="fw-bold">Tài khoản: </span> haibang</p>
                    </div>
                </div>

                <div>
                    <span class="fw-bold">Khách đặt bàn:</span>

                    <div style="min-height:350px; overflow: hidden;">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">STT</th>
                                    <th scope="col" class="text-center">Thời gian</th>
                                    <th scope="col" class="text-center">Số lượng (ng)</th>
                                    <th scope="col" class="text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">18:00, 22/1/2024</td>
                                    <td class="text-center" style="padding-top: 13px;">4</td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <span class="status-wait">Đang chờ</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">18:00, 22/1/2024</td>
                                    <td class="text-center" style="padding-top: 13px;">4</td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <span class="status-success">Đã duyệt</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">18:00, 22/1/2024</td>
                                    <td class="text-center" style="padding-top: 13px;">4</td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <span class="status-success">Đã duyệt</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        idBill: {
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
    margin: 50px 0px 110px 0px;
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
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.status-wait {
    padding: 3px 8px;
    background-color: rgba(193, 193, 2, 0.784);
    border-radius: 15px;
}
</style>