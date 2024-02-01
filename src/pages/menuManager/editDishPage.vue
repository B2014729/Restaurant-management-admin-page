<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Cập nhật thông tin món ăn__: {{ id }}</h4>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <div class="d-flex justify-content-center">
                            <img src="https://t.vietgiaitri.com/2022/7/6/an-ngon-ma-khong-so-beo-voi-salad-rau-tron-thap-cam-242-6543634.jpeg"
                                alt="" class="w-75 rounded-4">
                        </div>
                        <div class="d-flex justify-content-center form-floating my-2">
                            <input class=" w-75 form-control" id="avatar" type="file" @change="previewFiles" ref="image">
                            <label for="avatar" style="margin-left:35px;">Thêm hình ảnh:</label>
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control" id="fullname" :v-model="data.fullname">
                                    <label for="fullname">*Tên món:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <select class="form-select ps-3" id="type" aria-label="Default select example"
                                        v-model="data.type">
                                        <option value="0">Lẩu</option>
                                        <option value="1">Nướng</option>
                                        <option value="0">Lẩu</option>
                                        <option value="1">Nướng</option>
                                    </select>
                                    <label for="type">*Loại danh mục:</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-floating mb-2">
                                    <select class="form-select ps-3" id="position" aria-label="Default select example"
                                        v-model="data.position">
                                        <option value="0">Đĩa</option>
                                        <option value="1">Phần</option>
                                        <option value="0">Kg</option>
                                    </select>
                                    <label for="position">*Đơn vị tính:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="number" class="form-control" id="name" v-model="data.name">
                                    <label for="name">*Giá bán (vnđ):</label>
                                </div>
                            </div>
                            <div class="form-floating mb-2">
                                <textarea type="text" class="form-control" id="address" v-model="data.address"
                                    style="height: 100px;"></textarea>
                                <label for="address" class="ms-3">*Ghi chú:</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-success ms-3" style="width: 150px;">Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        id: {
            type: Number
        }
    },

    data() {
        return {
            data: {},
        };
    }
}
</script>