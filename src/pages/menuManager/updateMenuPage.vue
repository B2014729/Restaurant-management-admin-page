<template>
    <div class="p-3">
        <confirmModal v-if="confirmModalActive" :message="message" @close="toggleModal(0)" @onActive="onDelete">
        </confirmModal>
        <addDishOnMenuModal v-if="addModalActive" @close="closeModalAdd" @onActive="onAddDish($event)">
        </addDishOnMenuModal>
        <div class="d-flex justify-content-between">
            <h4 class="text-secondary fw-bold">Danh sách món ăn trong menu:</h4>
        </div>

        <alertMessage v-if="showAlert" :status="status" :message="messageAlert"></alertMessage>
        <div class="row mt-1">
            <div class="col-md-10 col-12">
                <searchComponent class="w-100" @submit="search($event)" v-model="searchText">
                </searchComponent>
            </div>
            <div class="col-md-2 d-flex justify-content-end">
                <button class="btn btn-success" @click="closeModalAdd"><i class="fa-solid fa-plus"></i> Thêm
                    món</button>
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
                <tbody v-for="(listDishOnType, index) in searchDish" :key="index">
                    <tr>
                        <th scope="row" class="text-center  bg-secondary text-white">Loại món</th>
                        <td class="text-center bg-secondary fw-bold">{{ listDishOnType.tenloai }}</td>
                        <td class="text-center" style="width: 120px;"> </td>
                        <td class="text-center"></td>
                        <td class="text-center"></td>
                        <td class="text-center" style="padding-top: 0px;"></td>
                    </tr>
                    <tr v-for="(item, i) in listDishOnType.mon" :key="i">
                        <th scope="row" class="text-center fw-bold pt-4">{{ item.idmon }}</th>
                        <td class="text-center pt-4">{{ item.tenmon }}</td>
                        <td class="text-center" style="width: 120px;">
                            <img style="height: 78px;" :src="item.hinhanh" alt="Ảnh món" class="w-100">
                        </td>
                        <td class="text-center pt-4">{{ formatNumber(item.gia) }}</td>
                        <td class="text-center pt-4">{{ item.donvitinh }}</td>
                        <td class="text-center pt-4" style="padding-top: 0px;">
                            <div class="d-flex justify-content-center">
                                <button class="btn" @click="toggleModal(item.idmon)"><i
                                        class="fa-solid fa-circle-xmark text-danger"></i>
                                </button>
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

import dishService from '@/services/dish.service';
import searchComponent from '@/components/searchComponent.vue';
import confirmModal from '@/components/modalsComponent/confirmModal.vue';
import addDishOnMenuModal from '@/components/modalsComponent/addDishOnMenuModal.vue';
import alertMessage from '@/components/alertMessage/alertMessage.vue';

export default {
    components: {
        searchComponent,
        confirmModal,
        alertMessage,
        addDishOnMenuModal
    },

    setup() {
        let showAlert = ref(false);
        let status = ref('');
        let messageAlert = ref('');

        let confirmModalActive = ref(false);
        let addModalActive = ref(false);
        let message = ref('');
        let idDish = ref(0);


        const toggleModal = (id) => {
            idDish.value = id;
            message.value = `Xóa thông tin món ăn ${id} khỏi menu?`;
            confirmModalActive.value = !confirmModalActive.value;
        }

        const closeModalAdd = () => {
            addModalActive.value = !addModalActive.value;
        }

        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number))
        }

        return {
            showAlert, messageAlert, status,
            idDish, confirmModalActive,
            toggleModal, message, formatNumber,
            addModalActive, closeModalAdd,
        };
    },

    computed: {
        listDishString() {
            return this.listDish.map((listDishOnType) => {
                const { tenloai, mon, } = listDishOnType;
                const tenmon = [];
                const idmon = [];
                mon.map((element) => {
                    tenmon.push(element.tenmon);
                    idmon.push(element.idmon);
                });
                return [tenloai, tenmon.join(""), idmon.join("")].join("");
            });
        },

        searchDish() {
            if (!this.searchText) {
                return this.listDish
            }
            return this.listDish.filter((_bill, index) => {
                return this.listDishString[index].includes(this.searchText);
            });
        }
    },

    data() {
        return {
            listDish: {},
            searchText: '',
        };
    },

    async created() {
        try {
            await this.fetchData();
        } catch (error) {
            console.log(error);
        }

    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async fetchData() {
            this.listDish = await dishService.GetMenu();
        },

        search(data) {
            console.log(data);
        },

        async onDelete() {
            this.confirmModalActive = false;
            try {
                await dishService.DeleteOutMenu(this.idDish).then((result) => {
                    if (result.statusCode == 200) {
                        this.messageAlert = 'Đã xóa món ăn khỏi menu!';
                        this.status = 'success';
                        this.showAlert = true;
                        setTimeout(() => {
                            this.showAlert = false;
                        }, 2500);
                        this.fetchData();
                    }
                });
            }
            catch (e) {
                this.messageAlert = 'Không thể xóa món ăn!';
                this.status = 'danger';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
                console.log(e);
            }
        },

        async onAddDish(idDish) {
            this.addModalActive = false;

            let issetDishInMenu = false;
            for (let index = 0; index < this.listDish.length; index++) {
                const element = this.listDish[index];
                console.log(element);
                let idDishList = [];
                element.mon.forEach((item) => {
                    idDishList.push(item.idmon);
                })
                issetDishInMenu = idDishList.includes(Number(idDish));
                if (issetDishInMenu) {
                    break;
                }
            }

            if (issetDishInMenu) {
                this.messageAlert = 'Món ăn đã tồn tại!';
                this.status = 'warning';
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 2500);
            } else {
                try {
                    await dishService.AddDishOnMenu(idDish).then((result) => {
                        if (result.statusCode == 200) {
                            this.messageAlert = 'Đã thêm món ăn vào menu!';
                            this.status = 'success';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                            this.fetchData();
                        } else {
                            this.messageAlert = 'Lỗi khi thêm món ăn!';
                            this.status = 'danger';
                            this.showAlert = true;
                            setTimeout(() => {
                                this.showAlert = false;
                            }, 2500);
                        }
                    });
                } catch (error) {
                    console.log(error);
                    this.messageAlert = 'Lỗi khi thêm món ăn!';
                    this.status = 'danger';
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 2500);
                }
            }
        }
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

.button-scroll {
    position: fixed;
    bottom: 10px;
    right: 20px;
}
</style>