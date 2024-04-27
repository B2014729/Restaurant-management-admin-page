<template>
    <div class="p-3">
        <detailPromotionModal v-if="modalDetailActive" :id="idPromotion" @close="toggleModalDetail(0)"
            @onAction="UpdatePromotion($event)">
        </detailPromotionModal>
        <createPromotionModal v-if="modalCreateActive" @close="toggleModalCreate" @onActive="Add($event)">
        </createPromotionModal>
        <confirmModal class="ps-5" v-if="modalConfirmActive" message="Xóa khuyến mãi này khỏi hệ thống?"
            @close="toggleModalConfirm(0)" @onActive="Delete">
        </confirmModal>

        <div class="d-flex justify-content-between">
            <div>
                <h4 class="text-secondary fw-bold">Quản lí thông tin nhà hàng:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'information-manager' }">
                        <span> Giới thiệu và khuyến mãi</span>
                    </router-link>
                </div>
            </div>

            <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        </div>
        <div class="row align-items-end">
            <div class="form-floating mb-2 col-md-8 col-12">
                <textarea type="text" class="form-control py-5 px-4" id="address" v-model="introduction"
                    style="height: 200px; font-size: 14px;"></textarea>
                <label for="address" class="ms-3 fs-5 py-3">*Thông tin giới thiệu nhà hàng:</label>
            </div>
            <div class="col-md-4 col-12 mb-2">
                <button class="btn btn-outline-success" @click="UpdateInforAbout">Cập nhật</button>
            </div>
        </div>

        <div class="d-flex justify-content-start">
            <h6 class="text-secondary fw-bold">Danh sách sự kiện khuyễn mãi:</h6>
        </div>
        <div class="row">
            <div class="col-md-10 col-12 d-flex ">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-2 col-12 d-flex justify-content-end">
                <button class="btn btn-success" @click="toggleModalCreate"><i class="fa-solid fa-plus"></i> Thêm
                    KM</button>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="width: 80px;">Mã KM</th>
                        <th scope="col" class="text-center">Tên Khuyến Mãi</th>
                        <th scope="col" class="text-center">Giảm giá (%)</th>
                        <th scope="col" class="text-center">Thành tiền (vnđ)</th>
                        <th scope="col" class="text-center">Ngày bắt đầu</th>
                        <th scope="col" class="text-center">Ngày kết thúc</th>
                        <th scope="col" class="text-center">Trạng thái</th>
                        <th scope="col" style="width: 120px;"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchPromotion" :key="index">
                        <th scope="row" class="text-center">{{ item.idkhuyenmai }}</th>
                        <td class="text-center">{{ item.tenkhuyenmai }}</td>
                        <td class="text-center">{{ item.giatrikhuyenmai }} %</td>
                        <td class="text-center">{{ formatNumber(item.giamgia) }}</td>
                        <td class="text-center">{{ formatDateTime(item.ngaybatdau) }}</td>
                        <td class="text-center">{{ formatDateTime(item.ngayketthuc) }}</td>
                        <td class="text-center" style="padding-top: 13px;">
                            <span v-if="item.trangthai == 1" class="status-success">Đang hoạt động</span>
                            <span v-else class="status-danger">Không hoạt động</span>
                        </td>
                        <th scope="row" class="text-center d-flex justify-content-evenly">
                            <button type="button" class="btn" @click="toggleModalDetail(item.idkhuyenmai)">
                                <i class="fa-solid fa-pen-to-square text-warning"></i>
                            </button>
                            <button type="button" class="btn" @click="toggleModalConfirm(item.idkhuyenmai)">
                                <i class="fa-solid fa-circle-xmark text-danger"></i>
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
// import * as XLSX from 'xlsx/xlsx.mjs';
import detailPromotionModal from '@/components/modalsComponent/detailPromotionModal.vue';
import searchComponent from '@/components/searchComponent.vue';

import promotionService from '@/services/promotion.service';
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import createPromotionModal from '@/components/modalsComponent/createPromotionModal.vue';

export default {
    components: {
        searchComponent, detailPromotionModal, alertMessage, confirmModal, createPromotionModal
    },

    setup() {
        let modalDetailActive = ref(false);

        let modalConfirmActive = ref(false);

        let modalCreateActive = ref(false);

        let idPromotion = ref(0);

        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        const toggleModalDetail = (id) => {
            modalDetailActive.value = !modalDetailActive.value;
            modalConfirmActive.value = false;
            modalCreateActive.value = false;
            idPromotion.value = id;
        }

        const toggleModalConfirm = (id) => {
            modalDetailActive.value = false;
            modalConfirmActive.value = !modalConfirmActive.value;
            modalCreateActive.value = false;
            idPromotion.value = id;
        }

        const toggleModalCreate = () => {
            modalConfirmActive.value = false;
            modalCreateActive.value = !modalCreateActive.value;
            modalDetailActive.value = false;
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        function formatDateTime(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            idPromotion, formatNumber, formatDateTime,
            showAlert, status, messageAlert,
            modalDetailActive, toggleModalDetail,
            modalConfirmActive, toggleModalConfirm,
            modalCreateActive, toggleModalCreate,
        };
    },

    computed: {
        listPromotionString() {
            return this.listPromotion.map((promotion) => {
                const { idkhuyenmai, tenkhuyenmai } = promotion;
                return [idkhuyenmai, tenkhuyenmai].join("");
            });
        },

        searchPromotion() {
            if (!this.searchText) {
                return this.listPromotion
            }
            return this.listPromotion.filter((_promotion, index) => {
                return this.listPromotionString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            searchText: '',
            listPromotion: [],
            introduction: 'We proudly serve you with traditional dishes from 3 regions of Vietnam, each infused with their own distinctive characteristics. The Northern taste is salty, the Central is distinguished by its hot, spicy flavours while the Southern region takes on a sweet and sour zest. To meet the expectations of multicultural customers from all walks of life, all with different culinary styles, we are happy to prepare dishes to satisfy your various exquisite tastes. It is highly appreciated that you please consult our friendly staff before ordering should you have special tastes or desires for spices.',
        };
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.listPromotion = [];
                let listPromotionFetch = await promotionService.FindAll();
                listPromotionFetch.forEach(element => {
                    if (element.khuyenmai.idkhuyenmai != 100) {
                        this.listPromotion.push(element.khuyenmai);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },

        search(data) {
            console.log(data);
        },

        // exportExcel() {
        //     let data = [];
        //     data.push(['Mã HĐ', 'Ngày tạo', 'Nhân viên', 'Bàn', 'Thanh toán', 'Giảm giá', 'Trạng thái']);
        //     this.listPromotion.forEach(element => {
        //         let row = [element.idhoadon, this.formatDateTime(element.ngaygioxuat), element.tennhanvien,
        //         element.idban, element.thanhtoan, element.giamgia, element.trangthai];
        //         data.push(row);
        //     });
        //     var workbook = XLSX.utils.book_new();
        //     var worksheet = XLSX.utils.aoa_to_sheet(data);
        //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //     XLSX.writeFile(workbook, 'promotionFile.xlsx');
        // }

        async UpdatePromotion(data) {
            this.modalDetailActive = false;
            try {
                let resultChange = await promotionService.Update(this.idPromotion, data);
                if (resultChange.statusCode == 200) {
                    await this.fetchData();
                    this.status = 'success';
                    this.messageAlert = 'Đã cập nhật thông tin khuyến mãi!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                } else {
                    this.status = 'warning';
                    this.messageAlert = "Cập nhật thông tin không thành công!";
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            } catch (error) {
                this.status = 'danger';
                this.messageAlert = 'Lỗi trong khi cập nhật thông tin khuyến mãi!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(error);
            }
        },

        async Delete() {
            this.modalConfirmActive = false;

            try {
                let resultDelete = await promotionService.Delete(this.idPromotion);
                if (resultDelete.statusCode == 200) {
                    await this.fetchData();

                    this.status = 'success';
                    this.messageAlert = 'Đã tắt khuyến mãi trên hệ thống!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);

                }
            } catch (error) {
                this.status = 'danger';
                this.messageAlert = 'Lỗi trong khi tắt khuyến mãi!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(error);
            }
        },

        async Add(promotion) {
            this.modalCreateActive = false;
            try {
                let resultAdd = await promotionService.Create(promotion);
                if (resultAdd.statusCode == 200) {
                    await this.fetchData();

                    this.status = 'success';
                    this.messageAlert = 'Đã thêm khuyến mãi mới!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            } catch (error) {
                this.status = 'danger';
                this.messageAlert = 'Lỗi trong khi thêm khuyến mãi!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(error);
            }
        },

        UpdateInforAbout() {
            this.status = 'success';
            this.messageAlert = 'Đã cập nhật thông tin giới thiệu nhà hàng!';
            this.showAlert = true; // On alert message
            setTimeout(() => {
                this.showAlert = false;
            }, 2500);
        }
    },
}

</script>
<style scoped>
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
</style>