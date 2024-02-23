<template>
    <div class="p-3">
        <detailSalaryModal class="modal-detail-bill" v-if="modalActive" :phase="phase" :idStaff="idStaff"
            @close="toggleModal(0)">
        </detailSalaryModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Thông tin lương__:</h4>
            <div>
                <button class="btn btn-outline-secondary" @click="exportExcel">
                    <i class="fa-solid fa-file-excel"></i> Xuất file</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12 d-flex h-100 mt-2">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-5 col-12 mt-2">
                <div class="d-flex " style="width: 270px">
                    <select class="form-select" aria-label="Default select example" v-model="phase">
                        <option v-for="(item, index) in phaseList" :key="index" :value="item.idgiaidoan">
                            {{ formatDate(item.ngaybatdau) }} - {{ formatDate(item.ngayketthuc) }}
                        </option>
                    </select>
                    <button class="btn" @click="onChangePhase"><i class="fa-solid fa-check text-success"></i></button>
                </div>
            </div>
            <div class="col-md-1 col-12 pt-2 d-flex justify-content-end">
                <button class="btn"><i class="fa-solid fa-sort"></i></button>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">STT</th>
                        <th scope="col" class="text-center">Mã NV</th>
                        <th scope="col" class="text-center">Họ và tên</th>
                        <th scope="col" class="text-center">Lương (vnđ/h)</th>
                        <th scope="col" class="text-center">Hình thức</th>
                        <th scope="col" class="text-center">Tổng giờ làm</th>
                        <th scope="col" class="text-center">Thưởng (vnđ)</th>
                        <th scope="col" class="text-center">Phạt (vnđ)</th>
                        <th scope="col" class="text-center">Tổng (vnđ)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchStaff" :key="index">
                        <td class="text-center">{{ index + 1 }}</td>
                        <th scope="row" class="text-center">{{ item.nhanvien.idnhanvien }}</th>
                        <td class="text-center">{{ item.nhanvien.hoten }}</td>
                        <td class="text-center">{{ formatNumber(item.luong) }}</td>
                        <td class="text-center">tháng</td>
                        <td class="text-center">{{ item.tonggio }}</td>
                        <td class="text-center">{{ formatNumber(item.thuong) }}</td>
                        <td class="text-center">{{ formatNumber(item.phat) }}</td>
                        <td class="text-center fw-bold">{{ formatNumber(item.tonggio * item.luong - item.phat + item.thuong)
                        }}</td>
                        <th scope="row" class="text-center">
                            <button type="button" class="btn" @click="toggleModal(item.nhanvien.idnhanvien)">
                                <i class="fa-solid fa-circle-plus text-success"></i></button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import moment from 'moment';
import * as XLSX from 'xlsx/xlsx.mjs';
import detailSalaryModal from '@/components/modalsComponent/detailSalaryModal.vue';

import staffService from '@/services/staff.service';
import calendrierService from '@/services/calendrier.service';
import searchComponent from '@/components/searchComponent.vue';
export default {
    components: {
        detailSalaryModal,
        searchComponent,
    },

    setup() {
        let modalActive = ref(false);
        let idStaff = ref(0);

        const toggleModal = (id) => {
            modalActive.value = !modalActive.value;
            idStaff.value = id;
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        const formatDate = (date) => {
            return moment(new Date(date)).format('DD/MM/YYYY');
        }

        return { modalActive, idStaff, toggleModal, formatNumber, formatDate };
    },

    data() {
        return {
            listSalary: [],
            phaseList: [],
            phase: '0',
            searchText: '',
        };
    },

    computed: {
        staffListString() {
            return this.listSalary.map((staff) => {
                const { hoten, idnhanvien } = staff.nhanvien;
                return [hoten, idnhanvien].join("");
            });
        },

        searchStaff() {
            if (!this.searchText) {
                return this.listSalary
            }
            return this.listSalary.filter((_staff, index) => {
                return this.staffListString[index].includes(this.searchText);
            });
        }
    },

    async created() {
        this.phaseList = await calendrierService.GetPhase();
        this.phase = this.phaseList[this.phaseList.length - 1].idgiaidoan;

        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listSalary = await staffService.Salary(this.phase);
            } catch (error) {
                console.log(error);
            }
        },

        async onChangePhase() {
            await this.fetchData();
        },

        search(data) {
            console.log(data);
        },

        exportExcel() {
            console.log(this.listSalary);
            let data = [];
            for (let index = 0; index < this.phaseList.length; index++) {
                const element = this.phaseList[index];
                if (element.idgiaidoan === this.phase) {
                    data.push(['Giai đoạn:', this.formatDate(element.ngaybatdau), this.formatDate(element.ngayketthuc)]);
                }
            }
            data.push(['Mã NV', 'Họ và tên', 'Lương (vnđ/h)', 'Hình thức', 'Số giờ làm', 'Thưởng', 'Phạt']);
            this.listSalary.forEach(element => {
                let row = [element.nhanvien.idnhanvien, element.nhanvien.hoten, element.luong, 'tháng',
                element.tonggio, element.thuong, element.phat];
                data.push(row);
            });
            console.log(data);
            var workbook = XLSX.utils.book_new();
            var worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, 'salaryTableFilw.xlsx');
        }
    }
}

</script>
<style  scoped>
.status {
    padding: 3px 8px;
    background-color: rgba(0, 128, 0, 0.575);
    border-radius: 15px;
}
</style>