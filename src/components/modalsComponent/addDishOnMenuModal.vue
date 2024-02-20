<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thêm món mới vào menu</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="form-floating mb-2">
                        <select class="form-select" id="iddish" aria-label="Default select example" v-model="idDish">
                            <option v-for="(item, index) in listDishOnSystem" :key="index" :value="item.idmon">
                                {{ item.tenmon }}
                            </option>
                        </select>
                        <label for="iddish">*Chọn món ăn:</label>
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-success ms-2" @click="onActive">Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dishService from '@/services/dish.service';
export default {
    setup(props, context) {
        // let data = 0;
        const closeModal = () => {
            context.emit("close");
        }
        // const onActive = () => {
        //     context.emit("onActive", data);
        // }
        return { closeModal };
    },

    data() {
        return {
            idDish: 0,
            listDishOnSystem: [],
            listDishOrderByType: [],
        }
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            this.listDishOrderByType = await dishService.FindAll();
            this.listDishOrderByType.forEach((element) => {
                this.listDishOnSystem.push(...element.mon);
            });
        },

        onActive() {
            this.$emit("onActive", this.idDish);
        }
    }
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
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {
    background-color: white;
    width: 35%;
    height: 27%;
    border-radius: 10px;
    animation-name: animationShow;
    animation-duration: 300ms;
}


@keyframes animationShow {
    0% {
        margin-top: -50px;
    }

    100% {
        margin-top: 0px;
    }
}


.btn-close {
    border: none;
    margin-right: 10px;
}
</style>