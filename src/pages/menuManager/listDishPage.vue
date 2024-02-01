<template>
    <div class="p-3">
        <detailStaffModal v-if="modalActive" :id="idStaff" @close="toggleModal(0)"></detailStaffModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Danh sách món ăn __:</h4>
        </div>
        <div class="row mt-1">
            <div class="col-md-10 col-12">
                <div class="d-flex">
                    <button type="button" class="btn btn-outline-secondary me-1"><i
                            class="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                </div>
            </div>
            <div class="col-md-2 d-flex justify-content-end">
                <router-link :to="{ name: 'create-dish-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Thêm món</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center ">Mã món</th>
                        <th scope="col" class="text-center">Tên món</th>
                        <th scope="col" class="text-center">Hình ảnh</th>
                        <th scope="col" class="text-center">Giá (vnđ)</th>
                        <th scope="col" class="text-center">Đơn vị tính</th>
                        <th scope="col" class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" class="text-center  bg-secondary text-white">Loại món</th>
                        <td class="text-center bg-secondary fw-bold">Lẩu</td>
                        <td class="text-center" style="width: 120px;"> </td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center" style="padding-top: 0px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2020/07/CookProduct/15-1200x676-1.jpg" alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center  bg-secondary text-white">Loại món</th>
                        <td class="text-center bg-secondary fw-bold">Nướng</td>
                        <td class="text-center" style="width: 120px;"> </td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center" style="padding-top: 0px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row" class="text-center  bg-secondary text-white">Loại món</th>
                        <td class="text-center bg-secondary fw-bold">Gỏi</td>
                        <td class="text-center" style="width: 120px;"> </td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center" style="padding-top: 0px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center pt-4 fw-bold pt-4">12</th>
                        <td class="text-center pt-4">Gỏi ngó sen tôm thịt</td>
                        <td class="text-center" style="width: 120px;">
                            <img src="https://cdn.tgdd.vn/2022/10/CookRecipe/Avatar/khoai-tay-chien-gion-bang-bot-chien-gion-thumbnail.jpg"
                                alt="" class="w-100">
                        </td>
                        <td class="text-center pt-4">90,000</td>
                        <td class="text-center pt-4">Đĩa</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-dish-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="button-scroll">
                <button class="btn btn-outline-secondary rounded-circle" @click="scrollToTop">
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import detailStaffModal from '@/components/modalsComponent/detailStaffModal.vue';

export default {
    components: {
        detailStaffModal,
    },
    setup() {
        let modalActive = ref(false);
        let idStaff = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idStaff.value = id;
        }
        return { modalActive, idStaff, toggleModal, };
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}

</script>
<style scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}

.address {
    width: 270px;
    height: 46.5px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

}

.button-scroll {
    position: fixed;
    bottom: 10px;
    right: 20px;
}
</style>