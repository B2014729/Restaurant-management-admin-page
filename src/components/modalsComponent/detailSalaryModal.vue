<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin lương chi tiết {{ idStaff }}</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Mã nhân viên: </span> 2664</span>
                        <p><span class="fw-bold">Họ và tên: </span> Dương Hãi Băng</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Lương cơ bản: </span> 23,000 vnđ/h</span>
                        <p><span class="fw-bold">Lãnh theo: </span> tháng</p>
                    </div>
                    <div class="col-md-4 col-12">
                        <span><span class="fw-bold">Nhận lương: </span> Ngày 02 hàng tháng </span>
                        <p><span class="fw-bold">Trạng thái: </span> <span class="status">Đã thanh toán</span></p>
                    </div>
                </div>

                <div>
                    <p class="mb-2"> <span class="fw-bold">Danh sách làm việc chi tiết: </span>01/01/2024 - 01/02/2024</p>

                    <div style="min-height:350px; overflow: hidden;">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">Ngày</th>
                                    <th scope="col" class="text-center">01</th>
                                    <th scope="col" class="text-center">02</th>
                                    <th scope="col" class="text-center">03</th>
                                    <th scope="col" class="text-center">04</th>
                                    <th scope="col" class="text-center">05</th>
                                    <th scope="col" class="text-center">06</th>
                                    <th scope="col" class="text-center">07</th>
                                    <th scope="col" class="text-center">08</th>
                                    <th scope="col" class="text-center">09</th>
                                    <th scope="col" class="text-center">10</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;"></td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="1"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="3"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="4"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>

                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">Ngày</th>
                                    <th scope="col" class="text-center">11</th>
                                    <th scope="col" class="text-center">12</th>
                                    <th scope="col" class="text-center">13</th>
                                    <th scope="col" class="text-center">14</th>
                                    <th scope="col" class="text-center">15</th>
                                    <th scope="col" class="text-center">16</th>
                                    <th scope="col" class="text-center">17</th>
                                    <th scope="col" class="text-center">18</th>
                                    <th scope="col" class="text-center">19</th>
                                    <th scope="col" class="text-center">20</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;"></td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="1"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="3"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="4"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>

                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">Ngày</th>
                                    <th scope="col" class="text-center">21</th>
                                    <th scope="col" class="text-center">22</th>
                                    <th scope="col" class="text-center">23</th>
                                    <th scope="col" class="text-center">24</th>
                                    <th scope="col" class="text-center">25</th>
                                    <th scope="col" class="text-center">26</th>
                                    <th scope="col" class="text-center">27</th>
                                    <th scope="col" class="text-center">28</th>
                                    <th scope="col" class="text-center">29</th>
                                    <th scope="col" class="text-center">30</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center" style="padding-top: 13px;"></td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="1"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="3"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="4"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>

                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="5"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                    <td class="text-center" style="padding-top: 13px;">
                                        <workingWeekCard :id="6"></workingWeekCard>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <ul>
                                <li style="list-style: none;"><span class="fw-bold">* Tổng số giờ: </span> 164</li>
                                <li style="list-style: none;"><span class="fw-bold">* Tiền thưởng: </span> 250,000 vnđ</li>
                                <li style="list-style: none;"><span class="fw-bold">* Phạt: </span> 115,000 vnđ.</li>
                                <li style="list-style: none;">
                                    <p class="fw-bold text-success">* Tổng lương: 6,039,000 vnđ</p>
                                </li>
                            </ul>
                        </div>
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
import workingWeekCard from "@/components/workingWeekCard.vue";
export default {
    components: {
        workingWeekCard,
    },

    props: {
        idStaff: {
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
    border-radius: 10px;
    margin: 10px 0;
    animation-name: animationShow;
    animation-duration: 300ms;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 10px;
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