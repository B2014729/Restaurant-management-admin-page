<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin chi tiết phiếu chi {{ idPayment }}</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-5 col-12">
                        <ul>
                            <li class="py-1"><span class="fw-bold title">Mã phiếu chi</span>: 23232</li>
                            <li class="py-1"><span class=" fw-bold title">Ngày lập</span>: 03/01/2024</li>
                            <li class="py-1"><span class="fw-bold title">Nhân viên</span>: Dương Hãi Băng</li>
                            <li class="py-1"><span class="fw-bold title">Trạng thái</span>:
                                <span class="status">Đã thanh toán</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md-7 col-12">
                        <span class="fw-bold">Thông tin nhà cung cấp:</span>
                        <ul>
                            <li class="py-1"><span class="fw-bold title">Mã NCC</span>: 232</li>
                            <li class="py-1"><span class=" fw-bold title">Tên đơn vị</span>: Vựa hải sản Lộc Cần Thơ
                            </li>
                            <li class="py-1"><span class="fw-bold title">Địa chỉ</span>: 397, Đường 30/4, Phường Hưng Lợi,
                                Quận Ninh Kiều, Thành phố Cần Thơ, Việt Nam</li>
                            <li class="py-1"><span class="fw-bold title">Số điện thoại</span>: 0595344899</li>
                            <li class="py-1"><span class="fw-bold title">Số tài khoản</span>: 7007568569656</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <span class="fw-bold">Danh sách sản phẩm:</span>

                    <div style="min-height:280px; overflow: hidden;">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">STT</th>
                                    <th scope="col" class="text-center">Tên sản phẩm</th>
                                    <th scope="col" class="text-center">Đơn giá (vnđ)</th>
                                    <th scope="col" class="text-center">Giảm (vnđ)</th>
                                    <th scope="col" class="text-center">Số lượng</th>
                                    <th scope="col" class="text-center">Đơn vị tính</th>
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
                                    <td class="text-center" style="padding-top: 13px;">thùng</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">thùng</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">thùng</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">thùng</td>
                                    <td class="text-center" style="padding-top: 13px;">270,000</td>
                                </tr>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;">1</td>
                                    <td class="text-center" style="padding-top: 13px;">Gỏi xoài tôm khô</td>
                                    <td class="text-center" style="padding-top: 13px;">90,000</td>
                                    <td class="text-center" style="padding-top: 13px;">0</td>
                                    <td class="text-center" style="padding-top: 13px;">3</td>
                                    <td class="text-center" style="padding-top: 13px;">thùng</td>
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
        idPayment: {
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
    margin: 5px 0px;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 5px;
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

ul>li {
    list-style: none;
    border-bottom: 1px solid rgb(205, 205, 205);
}

.title {
    display: inline-block;
    width: 150px;
    height: 100%;
}
</style>