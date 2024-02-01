<template>
    <div class="p-3">
        <detailStaffModal v-if="modalActive" :id="idStaff" @close="toggleModal(0)"></detailStaffModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Danh sách nhà cung cấp__:</h4>
            <div>
                <button class="btn btn-outline-secondary"><i class="fa-solid fa-file-excel"></i> Xuất file</button>
            </div>
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
                <router-link :to="{ name: 'create-staff-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Thêm mới</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã NCC</th>
                        <th scope="col" class="text-center">Tên NCC</th>
                        <th scope="col" class="text-center" style="width: 270px;">Địa chỉ</th>
                        <th scope="col" class="text-center">Số điện thoại</th>
                        <th scope="col" class="text-center">Số tài khoản</th>
                        <th scope="col" class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-supplier-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                                <button class="btn"><i class="fa-solid fa-circle-xmark text-danger"></i></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center fw-bold">12</th>
                        <td class="text-center"> Vựa hải sản Lộc Cần Thơ</td>
                        <td class="text-center  address">124/11A đường 3/2, phường Xuân Khánh, quận Ninh Kiều, Tp. Cần
                            Thơ</td>
                        <td class="text-center">0394458696</td>
                        <td class="text-center">7007568569656</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-staff-page', params: { id: 1 } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
</style>