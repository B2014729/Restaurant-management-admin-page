<template>
    <div class="menu d-flex justify-content-center w-100">
        <ul class="menu-parent w-100 p-0">
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'home-page' }">
                <li class="nav-item"><i class="fa-solid fa-chart-column"></i> TỔNG QUAN</li>
            </router-link>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'bill-manager-page' }">
                <li class="nav-item"><i class="fa-solid fa-money-bills"></i> QUẢN LÝ HÓA ĐƠN </li>
            </router-link>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'order-manager-page' }">
                <li class="nav-item"><i class="fa-brands fa-first-order"></i> QUẢN LÝ ORDER</li>
            </router-link>
            <a class="router-link" style="color: black;">
                <li>
                    <div>
                        <button class="btn btn-sm nav-item" type="button" data-bs-toggle="collapse"
                            data-bs-target="#staffManager" aria-expanded="false" aria-controls="staffManager">
                            <i class="fa-solid fa-users-rectangle"></i> QUẢN LÝ NHÂN VIÊN
                            <i class="fa-solid fa-chevron-down" style="font-size: 13px;"></i>
                        </button>
                        <div class="collapse border-none" id="staffManager">
                            <div class="card card-body " style="border: none; padding: 0;">
                                <ul>
                                    <router-link class="text-decoration-none" :to="{ name: 'list-staff-page' }"
                                        style="color: black; text-decoration: none;">
                                        <li class="text-secondary fw-bold px-2 py-1" style="list-style:disc;">
                                            Danh sách nhân viên
                                        </li>
                                    </router-link>

                                    <router-link :to="{ name: 'salary-page' }" style="color: black; ">
                                        <li class="text-secondary fw-bold px-2 py-1" style="list-style:disc;">
                                            Thông tin lương
                                        </li>
                                    </router-link>
                                    <router-link :to="{ name: 'calendrier-page' }" style="color: black;">
                                        <li class="text-secondary fw-bold px-2 py-1" style="list-style:disc;">
                                            Lịch làm việc
                                        </li>
                                    </router-link>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="dropdown">
                        <button class="btn btn-sm nav-item dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-users-rectangle"></i> QUẢN LÝ NHÂN VIÊN
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <router-link style="text-decoration: none;" :to="{ name: 'list-staff-page' }">
                                <li class="text-black px-2 py-1">Danh sách nhân viên</li>
                            </router-link>
                            <router-link style="text-decoration: none;" :to="{ name: 'salary-page' }">
                                <li class="text-black px-2 py-1">Thông tin lương</li>
                            </router-link>
                            <router-link style="text-decoration: none;" :to="{ name: 'calendrier-page' }">
                                <li class="text-black px-2 py-1">Lịch làm việc</li>
                            </router-link>
                        </ul>
                    </div> -->
                </li>
            </a>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'supplier-page' }">
                <li class="nav-item"><i class="fa-solid fa-user-gear"></i> NHÀ CUNG CẤP</li>
            </router-link>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'payment-page' }">
                <li class="nav-item"><i class="fa-brands fa-paypal"></i> QUẢN LÝ PHIẾU CHI</li>
            </router-link>
            <a class="router-link" style="color: black;">
                <li>
                    <div>
                        <button class="btn btn-sm nav-item" type="button" data-bs-toggle="collapse"
                            data-bs-target="#menuManager" aria-expanded="false" aria-controls="menuManager">
                            <i class="fa-solid fa-layer-group"></i> QUẢN LÝ MENU
                            <i class="fa-solid fa-chevron-down" style="font-size: 13px;"></i>
                        </button>
                        <div class="collapse border-none" id="menuManager">
                            <div class="card card-body" style="border: none; padding: 0;">
                                <ul>
                                    <router-link style="text-decoration: none;" :to="{ name: 'list-dish-page' }">
                                        <li class="text-secondary fw-bold px-2 py-1" style="list-style:disc;">Danh sách
                                            món</li>
                                    </router-link>
                                    <router-link style="text-decoration: none;" :to="{ name: 'menu-page' }">
                                        <li class="text-secondary fw-bold px-2 py-1" style="list-style:disc;">Danh mục
                                            menu</li>
                                    </router-link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </a>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'information-manager' }">
                <li class="nav-item"><i class="fa-solid fa-circle-info"></i> THÔNG TIN NHÀ HÀNG</li>
            </router-link>
            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'evalues-page' }">
                <li class="nav-item"><i class="fa-regular fa-star-half-stroke"></i> QUẢN LÝ ĐÁNH GIÁ</li>
            </router-link>
            <!-- <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'application' }">
                <li class="nav-item"><i class="ps-2 fa-brands fa-app-store-ios"></i>
                    ỨNG DỤNG
                </li>
            </router-link> -->
            <a class="router-link" style="text-decoration: none;" href="https://www.facebook.com/haibang.duong.963">
                <li class="nav-item"><i class="fa-brands fa-square-facebook"></i>
                    FACEBOOK
                </li>
            </a>

            <router-link class="router-link" style="text-decoration: none;" :to="{ name: 'personal-page' }">
                <li class="nav-item"><i class="fa-solid fa-gear"></i> CÀI ĐẶT</li>
            </router-link>
        </ul>
    </div>
</template>
<script>
</script>
<style scoped>
* {
    list-style: none;
}

.dropdown:focus {
    border: none;
}

.router-link>li {
    margin: 10px 0;
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.router-link>li:hover {
    color: black;
    background-color: #d6d5d5;
    border-radius: 5px;
}

.nav-item {
    color: rgb(120, 120, 120);
    padding: 7px 0;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
}

.dropdown-menu {
    width: 180px;
}

.dropdown-menu li {
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.dropdown-menu li:hover,
.dropdown-menu li:focus {
    background-color: #bebebe !important;
    color: black;
}
</style>
