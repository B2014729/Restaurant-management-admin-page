<template>
    <div class="p-3">
        <h4 class="text-secondary fw-bold">Cập nhật thông tin nhà cung cấp__: {{ id }}</h4>
        <div class="d-flex justify-content-center">
            <form class="w-75" @submit.prevent="{ }">
                <div class="row">
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="fullname" :v-model="data.fullname">
                            <label for="fullname">*Tên nhà cung cấp:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="dateofbirth" v-model="data.dateofbirth">
                            <label for="dateofbirth">*Số điện thoại:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="phone" v-model="data.phone">
                            <label for="phone">*Số tài khoản:</label>
                        </div>
                        <div class="form-floating mb-2">
                            <select class="form-select" id="status" aria-label="Default select example"
                                v-model="data.status">
                                <option value="0">MB Bank</option>
                                <option value="1">VietTinbank</option>
                                <option value="1">Agribank</option>
                                <option value="1">BIDV</option>
                                <option value="1">Saccombank</option>
                            </select>
                            <label for="status">*Ngân hàng:</label>
                        </div>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="form-floating mb-2">
                            <textarea type="text" class="form-control" id="address" v-model="data.address"
                                style="height: 255px;"></textarea>
                            <label for="address" class="ms-3">*Địa chỉ:</label>
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