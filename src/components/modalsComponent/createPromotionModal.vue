<template>
    <div id="myBookingModal" class="modalBooking d-flex justify-content-center">
        <div class="modal-booking-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Tạo khuyến mãi mới</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div style="min-height: 500px;">
                    <div class="row">
                        <div class="col-md-5 col-12">
                            <!-- <img class="w-100" src="#" alt="Anh banner"> -->
                            <div class="d-flex justify-content-start form-floating my-2">
                                <input class="w-100 form-control" id="avatar" type="file" @change="previewFiles"
                                    ref="image">
                                <label for="avatar">Ảnh banner:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="fullname" v-model="promotion.name">
                                <label for="fullname">*Tên khuyến mãi:</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select class="form-select " id="status" aria-label="Default select example"
                                    v-model="promotion.status">
                                    <option value="1">Đang hoạt động</option>
                                    <option value="0">Không hoạt động</option>
                                </select>
                                <label for="status">*Trạng thái:</label>
                            </div>
                        </div>
                        <div class="col-md-7 col-12 mt-1">
                            <ul>
                                <!-- <li>
                                    <div class="form-floating mb-2">
                                        <input type="text" class="form-control  ms-2" id="fullname"
                                            v-model="promotion.idkhuyenmai">
                                        <label for="fullname">*Mã KM:</label>
                                    </div>
                                </li> -->
                                <li>
                                    <div class="form-floating mb-2">
                                        <input type="date" class="form-control ms-2" id="dateStart"
                                            v-model="promotion.dateStart">
                                        <label for="dateStart">*Ngày bắt đầu (MM/DD/YYYY):</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-floating mb-2">
                                        <input type="date" class="form-control ms-2" id="dateEnd" ref="date"
                                            v-model="promotion.dateEnd">
                                        <label for="dateEnd">*Ngày kết thúc (MM/DD/YYYY):</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="form-floating mb-2">
                                        <input type="number" class="form-control ms-2" id="valueDiscount"
                                            v-model="promotion.value">
                                        <label for="valueDiscount">*Giá trị khuyễn mãi (%):</label>
                                    </div>
                                </li>
                                <li class="float-end">
                                    <span v-if="errorInforPromotion" class="text-end text-warning"
                                        style="font-size: 12px;">
                                        <i class="fa-solid fa-triangle-exclamation"></i>
                                        {{ errorMessage }}
                                    </span>
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

                        <div class="d-flex" v-for="index in dishCount" :key="index">
                            <div class="form-floating mb-2 w-50">
                                <select class="form-select" id="product" aria-label="Default select example"
                                    v-model="listDishId[index - 1]">
                                    <option v-for="(dish, i) in listDishInSystem" :key="i" :value="dish.idmon">
                                        {{ dish.tenmon }}
                                    </option>
                                </select>
                                <label for="product">*Món:</label>
                            </div>
                            <div class="form-floating mb-2 mx-2">
                                <input type="number" class="form-control" id="quantity"
                                    v-model="listDishQuantity[index - 1]">
                                <label for="quantity">*Số lượng:</label>
                            </div>
                            <button class="btn btn-outline-danger mt-2 h-50" @click="RemoveDish(index - 1)">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </button>
                        </div>
                        <span v-if="errorListDish" class="text-end text-warning" style="font-size: 12px;">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            Vui lòng chọn món khuyên mãi!
                        </span>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-auto w-100 pe-2">
                <div>
                    <button type="button" class="btn btn-outline-danger" @click="closeModal">Đóng</button>
                </div>
                <div class="ms-2">
                    <button type="button" class="btn btn-success" @click="onAction">Thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';

import dishService from '@/services/dish.service';
//import promotionService from '@/services/promotion.service';

export default {

    setup(props, context) {
        let listDishId = ref([0, 0]);
        let listDishQuantity = ref([0, 0]);
        let dishCount = ref(2);

        let errorInforPromotion = ref(false);
        let errorListDish = ref(false);
        let errorMessage = ref('');

        const closeModal = () => {
            context.emit("close");
        }

        return {
            closeModal, listDishId, listDishQuantity, dishCount,
            errorInforPromotion, errorListDish, errorMessage
        };
    },

    data() {
        return {
            promotion: {
                status: 1,
                image: null,
                detailPromotion: [],
            },
            listDishInSystem: [],
        };
    },

    async created() {
        try {
            this.listDishInSystem = await dishService.FindAllNoType();
        } catch (error) {
            console.log(error);
        }
    },

    methods: {
        addNewDish() {
            this.dishCount++;
            this.listDishId.push(0);
            this.listDishQuantity.push(0);
        },

        RemoveDish(index) {
            this.dishCount--;
            this.listDishId.splice(index, 1);
            this.listDishQuantity.splice(index, 1);
        },

        previewFiles(event) {
            this.promotion.image = event.target.files[0];
        },

        async onAction() {
            const fd = new FormData();
            let dateStart = null;
            let dateEnd = null;

            if (!this.promotion.name || !this.promotion.dateStart || !this.promotion.dateEnd
                || this.promotion.image == null || !this.promotion.value) {

                this.errorInforPromotion = true;
                this.errorMessage = 'Vui lòng chọn đầy đủ thông tin khuyến mãi!';
            }
            else {
                dateStart = new Date(this.promotion.dateStart);
                dateEnd = new Date(this.promotion.dateEnd);
                if (dateEnd < dateStart) {
                    this.errorInforPromotion = true;
                    this.errorMessage = 'Ngày bắt đầu và ngày kết thúc khuyến mãi không đúng!';
                    this.$refs.date.focus();
                } else {
                    this.errorInforPromotion = false;
                    if (this.listDishId.includes(0)) {
                        this.errorListDish = true;
                    } else {
                        this.errorListDish = false;
                    }
                }
            }

            this.promotion.detailPromotion = [
                this.listDishId,
                this.listDishQuantity,
            ];

            fd.append('banner', this.promotion.image);
            console.log(this.promotion);
            fd.append('name', this.promotion.name);
            fd.append('dateStart', this.promotion.dateStart);
            fd.append('dateEnd', this.promotion.dateEnd);
            fd.append('value', this.promotion.value);

            console.log('Detail Promotion: ', this.promotion.detailPromotion);

            this.promotion.detailPromotion.forEach(elements => {
                fd.append('detailPromotion', elements);
            })


            if (!this.errorInforPromotion && !this.errorListDish) {
                this.$emit('onActive', fd);
            }
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

.error:focus {
    border: red 2px solid;
}
</style>