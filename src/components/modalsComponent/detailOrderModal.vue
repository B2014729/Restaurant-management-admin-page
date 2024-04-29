<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <h5 class="text-dark fw-bold">Thông tin gọi món {{ idOrder }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="mt-4" style="min-height: 380px;">
                    <div>
                        <h6 class="fw-bold text-success">Danh sách món</h6>
                        <div>
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width: 20px;">STT</th>
                                        <th scope="col">Tên món</th>
                                        <th scope="col" style="width: 100px;">Số lượng</th>
                                        <th scope="col" style="width: 120px; text-align: center;">Giá bán (vnd)</th>
                                        <th scope="col">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in listDish" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ item.tenmon }}</td>
                                        <td class="text-center">{{ item.soluong }}</td>
                                        <td class="text-center">{{ formatNumber(item.gia) }}</td>
                                        <td>{{ item.ghichu }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-secondary ms-2" @click="closeModal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import orderService from '@/services/order.service';

export default {
    props: {
        idOrder: {
            type: Number,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }

        return {
            closeModal, formatNumber,
        };
    },

    data() {
        return {
            billInfor: {},
            listDish: [],
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.billInfor = await orderService.FindOneById(this.idOrder);
                let dish = {};
                this.billInfor.thongtinchitiet.forEach(element => {
                    if (!Object.prototype.hasOwnProperty.call(element, 'khuyenmai')) {
                        dish = element.mon;
                        dish.soluong = element.soluong
                        this.listDish.push(dish);
                    } else {
                        element.chitiet.forEach(e => {
                            e.soluong = e.soluong * element.soluong;
                            this.listDish.push(e);
                        })
                    }
                });
            } catch (error) {
                this.billInfor = {};
                console.log(error);
            }
        },

        checkTableIsEating() {
            if (Object.keys(this.billInfor) != 0) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style scoped lang="css">
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
    background-color: rgb(255, 255, 255);
    width: 50%;
    height: 70%;
    margin: 20px 0px 50px 0px;
    border-radius: 5px;
    animation-name: animationShow;
    animation-duration: 300ms;
    overflow: auto;
}

@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 2cap;
    }
}

.btn-close {
    border: none;
    margin-right: 10px;
}

.status-busy {
    background-color: rgba(190, 0, 0, 0.926);
    padding: 10px;
    border-radius: 20px;
}

.status-free {
    background-color: rgba(68, 209, 3, 0.908);
    padding: 10px;
    border-radius: 20px;
}
</style>