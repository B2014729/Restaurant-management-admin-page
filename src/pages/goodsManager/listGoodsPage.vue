<template>
    <div class="p-3">
        <confirmModal v-if="modalActive" message="Xóa hàng hóa khỏi hệ thống?" @close="toggleModalConfirm(0)"
            @onActive="onDelete">
        </confirmModal>
        <div class="d-flex justify-content-start">
            <div>
                <h4 class="text-secondary fw-bold">Danh sách hàng hóa:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'home-page' }">
                        <span>Trang chủ</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'depot-page' }">
                        <span> / Quản lí kho</span>
                    </router-link>
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'goods-page' }">
                        <span> / Danh sách hàng hóa</span>
                    </router-link>
                </div>
            </div>
        </div>

        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>

        <div class="row mt-1">
            <div class="col-md-10 col-12">
                <searchComponent @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-2 d-flex justify-content-end">
                <router-link :to="{ name: 'create-goods-page' }">
                    <button class="btn btn-success"><i class="fa-solid fa-plus"></i> Thêm mới</button>
                </router-link>
            </div>
        </div>
        <div class="mt-2">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center">Mã HH</th>
                        <th scope="col" class="text-center">Tên hàng hóa</th>
                        <th scope="col" class="text-center">HSD (tháng)</th>
                        <th scope="col" class="text-center">Đơn vị</th>
                        <th scope="col" class="text-center">Nhóm</th>
                        <th scope="col" class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in searchGoods" :key="index">
                        <th scope="row" class="text-center fw-bold" style="width: 80px;"> {{ item.idhanghoa }}</th>
                        <td class="text-center"> {{ item.tenhanghoa }}</td>
                        <td class="text-center" style="width: 180px;"> {{ item.hansudung }}</td>
                        <td class="text-center"> {{ item.donvitinh }}</td>
                        <td class="text-center"> {{ item.tenloai }}</td>
                        <td class="text-center" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <router-link :to="{ name: 'update-goods-page', params: { id: item.idhanghoa } }">
                                    <button class="btn">
                                        <i class="fa-solid fa-file-pen text-warning"></i>
                                    </button>
                                </router-link>
                                <button class="btn" @click="toggleModalConfirm(item.idhanghoa)"><i
                                        class="fa-solid fa-xmark text-danger pt-1"></i></button>
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
import alertMessage from '@/components/alertMessage/alertMessage.vue';
import searchComponent from '@/components/searchComponent.vue';
import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import goodsService from '@/services/goods.service.js';

export default {
    components: {
        searchComponent, alertMessage, confirmModal,
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');
        let modalActive = ref(false);
        let currentId = ref(0);


        const toggleModalConfirm = (id) => {
            modalActive.value = !modalActive.value;
            currentId.value = id;

            if (modalActive.value === false) {
                showAlert.value = true;
                setTimeout(() => {
                    showAlert.value = false;
                }, 2500);
                status.value = 'danger';
                messageAlert.value = 'Đã hủy yêu cầu xóa!';
            }
        }

        return {
            showAlert, status, messageAlert, currentId, toggleModalConfirm, modalActive
        };
    },

    data() {
        return {
            goodsList: [],
            searchText: '',
        };
    },

    computed: {
        goodsListString() {
            return this.goodsList.map((staff) => {
                const { tenhanghoa, tenloai } = staff;
                return [tenhanghoa, tenloai].join("");
            });
        },

        searchGoods() {
            if (!this.searchText) {
                return this.goodsList
            }
            return this.goodsList.filter((_staff, index) => {
                return this.goodsListString[index].includes(this.searchText);
            });
        }
    },

    async created() {
        await this.fetchData();
    },

    methods: {
        search(e) {
            console.log(e);
        },

        async fetchData() {
            try {
                this.goodsList = await goodsService.FindAll();
            } catch (error) {
                console.log(error);
            }
        },

        async onDelete() {
            this.modalActive = false;

            try {
                let result = await goodsService.Delete(this.currentId);
                if (result.statusCode == 200) {
                    await this.fetchData();
                    this.status = 'success';
                    this.messageAlert = 'Đã xóa hàng hóa!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                } else {
                    this.status = 'danger';
                    this.messageAlert = 'Lỗi khi xóa hàng hóa!';
                    this.showAlert = true; // On alert message
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }

            } catch (error) {
                this.status = 'danger';
                this.messageAlert = 'Lỗi khi xóa hàng hóa!';
                this.showAlert = true; // On alert message
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(error);
            }
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

table>thead>tr>th {
    background-color: var(--color-header-table);
}
</style>