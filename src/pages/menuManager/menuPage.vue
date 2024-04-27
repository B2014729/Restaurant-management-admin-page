<template>
    <div class="p-3">
        <div class="d-flex justify-content-between mb-2">
            <div>
                <h4 class="text-secondary fw-bold">Giao diện menu:</h4>
                <div class="ms-2">
                    <router-link class="text-success" style="text-decoration: none; font-size: 14px;"
                        :to="{ name: 'menu-page' }">
                        <span>Menu</span>
                    </router-link>
                </div>
            </div>
            <router-link :to="{ name: 'update-menu-page' }">
                <button class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
            </router-link>
        </div>
        <div class="container-menu">
            <h4 class="fw-bold text-center pt-4 title">MENU</h4>
            <div class="row">
                <div class="col-md-4">
                    <div class="content">
                        <h5 class="text-warning fw-bold text-center">Các món nướng</h5>
                        <ul>
                            <li v-for="(   item, index   ) in monNuong   " :key="index" style="list-style: none;"
                                class="text-warning fw-bold">
                                <span style="display: inline-block; width: 260px;" class="text-white">
                                    {{ item.tenmon }}
                                </span>
                                {{ formatNumber(item.gia) }}
                            </li>
                        </ul>
                    </div>

                    <div style="min-height: 400px;">
                        <div style="position: relative;">
                            <img src="../../../public/images/lau1.png" alt="" class="w-100 img-lau">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="../../../public/images/nuong.png" alt="" class="w-100">
                    <div class="content">
                        <h5 class="text-warning fw-bold text-center">Các món lẩu</h5>
                        <ul>
                            <li v-for="(   item, index   ) in monLau   " :key="index" style="list-style: none;"
                                class="text-warning fw-bold">
                                <span style="display: inline-block; width: 260px;" class="text-white">
                                    {{ item.tenmon }}
                                </span>
                                {{ formatNumber(item.gia) }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="content">
                        <h5 class="text-warning fw-bold text-center">Các món gỏi & khai vị</h5>
                        <ul>
                            <li v-for="(   item, index   ) in monGoiVaKhaivi   " :key="index" style="list-style: none;"
                                class="text-warning fw-bold">
                                <span style="display: inline-block; width: 260px;" class="text-white">
                                    {{ item.tenmon }}
                                </span>
                                {{ formatNumber(item.gia) }}
                            </li>
                        </ul>
                    </div>
                    <div style="min-height: 300px;">
                        <div style="position: relative;">
                            <img src="../../../public/images/salad.png" alt="" class="w-100 img-salad">
                        </div>
                    </div>

                    <div class="content">
                        <h5 class="text-warning fw-bold text-center">Thức uống & thêm</h5>
                        <ul>
                            <li v-for="(   item, index   ) in monThemVaNuoc   " :key="index" style="list-style: none;"
                                class="text-warning fw-bold">
                                <span style="display: inline-block; width: 260px;" class="text-white">
                                    {{ item.tenmon }}
                                </span>
                                {{ formatNumber(item.gia) }}/{{ item.donvitinh }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dishService from '@/services/dish.service';
export default {

    setup() {
        const formatNumber = (number) => {
            return (new Intl.NumberFormat().format(number));
        }
        return {
            formatNumber
        }
    },

    data() {
        return {
            listDishMenu: [],
            monNuong: [],
            monThemVaNuoc: [],
            monLau: [],
            monGoiVaKhaivi: [],
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
        async fetchData() {
            this.listDishMenu = await dishService.GetMenu();
            this.listDishMenu.forEach((element) => {
                if (element.tenloai == 'Nước ngọt' || element.tenloai == 'Thêm' || element.tenloai == 'Bia') {
                    this.monThemVaNuoc.push(...element.mon);
                }
                if (element.tenloai == 'Nướng') {
                    this.monNuong.push(...element.mon);
                }
                if (element.tenloai == 'Lẩu') {
                    this.monLau.push(...element.mon);
                }
                if (element.tenloai == 'Gỏi' || element.tenloai == 'Khai vị') {
                    this.monGoiVaKhaivi.push(...element.mon);
                }
            });
        }
    }
}
</script>
<style scoped>
.container-menu {
    min-height: 800px;
    width: 1200px;
    margin-left: 10px;
    background-image: url('https://img.freepik.com/premium-photo/creative-nature-layout-made-tropical-leaves_40112-74.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.title {
    color: rgba(232, 190, 37, 0.84);
    font-family: 'Times New Roman', Times, serif;
    font-size: 49px;
    font-weight: 900;
}

.content {
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.216);
    border-radius: 15px;
}

.img-lau {
    position: absolute;
    top: -100px;
    right: -50px;
}

.img-salad {
    position: absolute;
    top: -60px;
    left: -70px;
}

.btn-remove {
    background-color: rgba(255, 255, 255, 0);
    border: none;
}
</style>