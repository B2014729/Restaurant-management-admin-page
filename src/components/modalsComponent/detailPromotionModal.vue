<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông tin khuyến mãi chi tiết</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div style="min-height: 500px;">
                    <div class="row">
                        <div class="col-md-5 col-12">
                            <img class="w-100" :src="promotion.hinhanh" alt="Anh banner">
                            <div class="d-flex justify-content-start my-2">
                                <div class="form-floating">
                                    <input class="w-100 form-control" id="avatar" type="file" @change="previewFiles"
                                        ref="image">
                                    <label for="avatar">Cập nhật banner:</label>
                                </div>
                                <button class="btn btn-outline-success h-75 mt-3 ms-2" @click="UploadBanner">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="fullname" v-model="promotion.tenkhuyenmai">
                                <label for="fullname">*Tên khuyến mãi:</label>
                            </div>
                        </div>
                        <div class="col-md-7 col-12">
                            <ul>
                                <!-- <li>
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control  ms-2" id="fullname"
                                            v-model="promotion.idkhuyenmai">
                                        <label for="fullname">*Mã KM:</label>
                                    </div>
                                </li> -->
                                <li>
                                    <div class="form-floating mb-3">
                                        <input type="date" class="form-control ms-2" id="dateStart"
                                            v-model="promotion.ngaybatdau">
                                        <label for="dateStart">*Ngày bắt đầu (MM/DD/YYYY):</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-floating mb-3">
                                        <input type="date" class="form-control ms-2" id="dateEnd"
                                            v-model="promotion.ngayketthuc">
                                        <label for="dateEnd">*Ngày kết thúc (MM/DD/YYYY):</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-floating mb-3">
                                        <input type="number" class="form-control ms-2" id="valueDiscount"
                                            v-model="promotion.giatrikhuyenmai">
                                        <label for="valueDiscount">*Giá trị khuyễn mãi (%):</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-floating mb-3">
                                        <select class="form-select ms-2" id="status" aria-label="Default select example"
                                            v-model="promotion.trangthai">
                                            <option value="1">Đang hoạt động</option>
                                            <option value="0">Không hoạt động</option>
                                        </select>
                                        <label for="status">*Trạng thái:</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-between">
                            <h6 class="text-secondary fw-bold">Danh sách món:</h6>
                            <div>
                                <button class="btn btn-outline-success" @click="addNewDish"><i
                                        class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>

                        <div class="d-flex" v-for="index in listDishDetail.length" :key="index">
                            <div class="form-floating mb-2 w-50">
                                <select class="form-select" id="product" aria-label="Default select example"
                                    v-model="listDishDetail[index - 1].idmon">
                                    <option v-for="(dish, i) in listDishInSystem" :key="i" :value="dish.idmon">
                                        {{ dish.tenmon }}
                                    </option>
                                </select>
                                <label for="product">*Món:</label>
                            </div>
                            <div class="form-floating mb-2 mx-2">
                                <input type="number" class="form-control" id="quantity"
                                    v-model="listDishDetail[index - 1].soluong">
                                <label for="quantity">*Số lượng:</label>
                            </div>
                            <button class="btn btn-outline-danger mt-2 h-50" @click="RemoveDish(index - 1)">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-auto w-100 pe-2 pb-2">
                <div>
                    <button type="button" class="btn btn-outline-danger" @click="closeModal">Đóng</button>
                </div>
                <div class="ms-2">
                    <button type="button" class="btn btn-success" @click="onAction">Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import moment from 'moment';
import dishService from '@/services/dish.service';
import promotionService from '@/services/promotion.service';

export default {
    props: {
        id: {
            required: true,
            type: Number,
        },
    },

    setup(props, context) {
        let listDishDetail = ref([]);
        const closeModal = () => {
            context.emit("close");
        }

        return { closeModal, listDishDetail };
    },

    data() {
        return {
            fileSelect: null,
            promotion: {},
            listDish: [],
            listDishInSystem: [],
        };
    },

    async created() {
        try {
            await this.fetchData();

        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        async fetchData() {
            try {
                let promotionFetch = await promotionService.FindOneById(this.id);
                this.listDishInSystem = await dishService.FindAllNoType();
                this.promotion = promotionFetch.khuyenmai;

                this.listDishDetail = promotionFetch.chitiet;
                this.promotion.ngaybatdau = moment(this.promotion.ngaybatdau).format("YYYY-MM-DD");
                this.promotion.ngayketthuc = moment(this.promotion.ngayketthuc).format("YYYY-MM-DD");
            } catch (error) {
                console.log(error);
            }
        },

        previewFiles(event) {
            this.fileSelect = event.target.files[0];
        },

        async UploadBanner() {
            try {
                if (this.fileSelect != null) {
                    const fd = new FormData();
                    fd.append('banner', this.fileSelect);
                    let result = promotionService.UploadBanner(this.promotion.idkhuyenmai, fd);

                    if (result.statusCode == 200) {
                        await this.fetchData();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        addNewDish() {
            this.listDishDetail.push({ idmon: 0, soluong: 0 });
        },

        RemoveDish(index) {
            this.listDishDetail.splice(index, 1);
        },

        async onAction() {
            let idDishArray = [];
            let dishQuantityArray = [];

            this.listDishDetail.forEach(element => {
                idDishArray.push(element.idmon);
                dishQuantityArray.push(element.soluong);
            });

            let data = {
                idPromotion: this.promotion.idkhuyenmai,
                name: this.promotion.tenkhuyenmai,
                dateStart: this.promotion.ngaybatdau,
                dateEnd: this.promotion.ngayketthuc,
                value: this.promotion.giatrikhuyenmai,
                status: this.promotion.trangthai,
                detailPromotion: [
                    idDishArray, dishQuantityArray
                ]
            }

            this.$emit('onAction', data);
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
    background-color: white;
    width: 50%;
    margin: 20px 0px 10px 300px;
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
        margin-top: 20px;
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
    font-weight: bold;
    font-size: 14px;
    color: black;
}

.status-danger {
    padding: 3px 8px;
    background-color: rgba(128, 21, 0, 0.575);
    border-radius: 15px;
    font-weight: bold;
    font-size: 14px;
    color: black;
}

ul>li {
    list-style: none;
    margin-top: 5px;
}
</style>