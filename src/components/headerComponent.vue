<template>
    <header class="d-flex align-items-end justify-content-between">
        <h5 class="text-secondary fw-bold">Dashboard</h5>
        <div class="mb-2 d-flex">
            <div class="d-flex align-items-center">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                    <button class="btn" type="button" id="button-addon2"><i
                            class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>
            <div class="d-flex align-items-center mx-3">
                <button class="btn">
                    <i class="fa-solid fa-bell text-secondary fs-5"></i>
                </button>
            </div>
            <div class="dropdown d-flex align-items-center">
                <button class="btn btn-secondary rounded-circle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="fa-solid fa-user"></i>
                </button>
                <span class="ms-2 pt-2">Hai Bang</span>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-bell m-1"></i> Thông báo</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-circle-info me-1"></i> Cá nhân</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fa-solid fa-right-from-bracket  me-1"></i> Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>

export default {
    name: 'HeaderComponent',

    methods: {
        onLogout() {
            if (confirm('Bạn muốn đăng xuất!')) {
                this.$cookies.remove('jwt');
                window.location.href = '/';
            }
        }
    }
}
</script>   
<style scoped>
header {
    height: 50px;
}

input {
    border: none;
    border-radius: none;
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.dropdown-menu li {
    border-bottom: 1px rgb(192, 192, 192) solid;
}

.dropdown .dropdown-menu .dropdown-item:hover,
.dropdown .dropdown-menu .dropdown-item:focus {
    background-color: #bebebe !important;
    color: black;
}
</style>
