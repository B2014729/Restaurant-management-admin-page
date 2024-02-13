<template>
    <div class="p-3">
        <detailStaffModal v-if="modalActive" :id="idStaff" @close="toggleModal(0)"></detailStaffModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Danh sách nhân viên__:</h4>
            <div>
                <button class="btn btn-outline-secondary"><i class="fa-solid fa-file-excel"></i> Xuất file</button>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-md-10 col-12">
                <searchComponent @submit="search($event)" v-model="searchText">
                </searchComponent>
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
                        <th scope="col" class="text-center">Mã NV</th>
                        <th scope="col" class="text-center">Họ tên</th>
                        <th scope="col" class="text-center">Ngày sinh</th>
                        <th scope="col" class="text-center">Giới tính</th>
                        <th scope="col" class="text-center" style="width: 270px;">Địa chỉ</th>
                        <th scope="col" class="text-center">Chức vụ</th>
                        <th scope="col" class="text-center">Trạng thái</th>
                        <th scope="col" class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchStaff" :key="index">
                        <th scope="row" class="text-center fw-bold"> {{ item.idnhanvien }}</th>
                        <td class="text-center"> {{ item.hoten }}</td>
                        <td class="text-center"> {{ item.ngaysinh }}</td>
                        <td class="text-center"> {{ item.gioitinhchu }}</td>
                        <td class="text-center  address"> {{ item.diachi }}</td>
                        <td class="text-center"> {{ item.tenchucvu }}</td>
                        <td class="text-center">
                            <span class="status">Đang làm việc</span>
                        </td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn" @click="toggleModal(item.idnhanvien)">
                                    <i class="fa-solid fa-circle-info text-secondary"></i>
                                </button>
                                <router-link :to="{ name: 'update-staff-page', params: { id: item.idnhanvien } }">
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

        <p class="text-danger fw-bold">DS nhân viên đã nghĩ việc:</p>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã NV</th>
                        <th scope="col" class="text-center">Họ tên</th>
                        <th scope="col" class="text-center">Ngày sinh</th>
                        <th scope="col" class="text-center">Giới tính</th>
                        <th scope="col" class="text-center" style="width: 270px;">Địa chỉ</th>
                        <th scope="col" class="text-center">Chức vụ</th>
                        <th scope="col" class="text-center">Trạng thái</th>
                        <th scope="col" class="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in staffListOff" :key="index">
                        <th scope="row" class="text-center fw-bold">{{ item.idnhanvien }}</th>
                        <td class="text-center">{{ item.hoten }}</td>
                        <td class="text-center">{{ item.ngaysinh }}</td>
                        <td class="text-center">{{ item.gioitinhchu }}</td>
                        <td class="text-center  address">{{ item.diachi }}</td>
                        <td class="text-center">{{ item.tenchucvu }}</td>
                        <td class="text-center">
                            <span class="status-off">Nghĩ việc</span>
                        </td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn" @click="toggleModal(item.idnhanvien)">
                                    <i class="fa-solid fa-circle-info text-secondary"></i>
                                </button>
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
import searchComponent from '@/components/searchComponent.vue';
import staffService from '@/services/staff.service.js';

export default {
    components: {
        detailStaffModal,
        searchComponent
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

    data() {
        return {
            staffList: [],
            staffListOff: [],
            staffListOn: [],
            searchText: '',
        };
    },

    computed: {
        staffListString() {
            return this.staffListOn.map((staff) => {
                const { hoten, idnhanvien } = staff;
                return [hoten, idnhanvien].join("");
            });
        },

        searchStaff() {
            if (!this.searchText) {
                return this.staffListOn
            }
            return this.staffListOn.filter((_staff, index) => {
                return this.staffListString[index].includes(this.searchText);
            });
        }
    },

    async created() {
        this.staffList = await staffService.FindAll();

        this.staffList.forEach((element) => {
            if (element.trangthai === 1) {
                this.staffListOn.push(element);
            } else {
                this.staffListOff.push(element);
            }
        });
    },

    methods: {
        search(e) {
            console.log(e);
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

.status-off {
    padding: 3px 8px;
    background-color: rgba(160, 29, 0, 0.671);
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