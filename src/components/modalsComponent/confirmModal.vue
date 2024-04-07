<template>
    <div id="myBillModal" class="modalBill d-flex justify-content-center">
        <div class="modal-bill-content">
            <div class="p-3 d-flex flex-column">
                <div class=" d-flex justify-content-between">
                    <div>
                        <h5 class="fw-bold">Thông báo</h5>
                    </div>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <hr>
                <div class="row">
                    <span>{{ message }}</span>
                </div>

                <div class="d-flex justify-content-end mt-auto w-100">
                    <div>
                        <button type="button" class="btn btn-outline-danger" @click="closeModal">Hủy</button>
                        <button type="button" class="btn btn-success ms-2" @click="onActive">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
        }
    },

    setup(props, context) {
        const closeModal = () => {
            context.emit("close");
        }

        const onActive = () => {
            context.emit("onActive");
        }
        return { closeModal, onActive };
    },
}
</script>
<style scoped lang="css">
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
    height: 21%;
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