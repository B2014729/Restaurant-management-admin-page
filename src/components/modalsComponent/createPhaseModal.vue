<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thêm mới giai đoạn</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <div class="form-floating mb-2">
                        <input type="date" class="form-control" id="startdate" v-model="data.startdate">
                        <label for="startdate">*Ngày bắt đầu:</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input type="date" class="form-control" id="enddate" v-model="data.enddate">
                        <label for="enddate">*Ngày kết thúc:</label>
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
export default {
    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }
        let data = {};
        const onActive = () => {
            context.emit("onActive", data);
        }
        return { closeModal, onActive, data };
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
    background-color: rgba(0, 0, 0, 0.508);
}

.modal-bill-content {
    background-color: white;
    width: 35%;
    height: 36%;
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