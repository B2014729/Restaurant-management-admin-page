<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin chi tiết {{ idBill }}</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Mã hóa đơn: </span> 2335664</span>
                        <p><span class="fw-bold">Nhân viên: </span> Dương Hãi Băng</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <p><span class="fw-bold">Bàn: </span> 23</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Ngày giờ: </span> 18:50 22/1/2024 </span>
                        <p><span class="fw-bold">Trạng thái: </span> <span class="status">Đã thanh toán</span></p>
                    </div>
                </div>

                <div>
                    <span class="fw-bold">Danh sách món:</span>

                    <div style="min-height:350px; overflow: hidden;">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">STT</th>
                                    <th scope="col" class="text-center">Tên món</th>
                                    <th scope="col" class="text-center">Đơn giá (vnđ)</th>
                                    <th scope="col" class="text-center">Giảm (vnđ)</th>
                                    <th scope="col" class="text-center">Số lượng</th>
                                    <th scope="col" class="text-center">Tổng (vnđ)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end mt-2">
                        <p class="fw-bold">Thanh toán: 1,230,000 vnđ</p>
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
.modalBill {
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

.modal-bill-content {
    background-color: white;
    width: 60%;
    margin: 50px 0px;
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

.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}
</style>