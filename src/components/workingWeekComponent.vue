<template>
    <div>

        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col" class="text-center">Nhân viên</th>
                    <th scope="col" class="text-center">Thứ 2 </th>
                    <th scope="col" class="text-center">Thứ 3</th>
                    <th scope="col" class="text-center">Thứ 4</th>
                    <th scope="col" class="text-center">Thứ 5</th>
                    <th scope="col" class="text-center">Thứ 6</th>
                    <th scope="col" class="text-center">Thứ 7</th>
                    <th scope="col" class="text-center">Chủ nhật</th>
                    <th scope="col" class="text-center"> Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Quản lí</th>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fw-bold ">1/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center align-middle">Dương Hãi Băng</th>
                    <td class="text-center">
                        <workingWeekCard :id="1"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="1"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="2"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="5"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="1"></workingWeekCard>

                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="4"></workingWeekCard>
                    </td>
                    <td class="text-center">
                        <workingWeekCard :id="3"></workingWeekCard>
                    </td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>

                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Phục vụ</th>
                    <td class="text-center fw-bold">6/ca</td>
                    <td class="text-center fw-bold">6/ca</td>
                    <td class="text-center fw-bold">6/ca</td>
                    <td class="text-center fw-bold">6/ca</td>
                    <td class="text-center fw-bold">8/ca</td>
                    <td class="text-center fw-bold">8/ca</td>
                    <td class="text-center fw-bold">8/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Thu ngân</th>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Bếp trưởng</th>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Phụ bếp</th>
                    <td class="text-center fw-bold">3/ca</td>
                    <td class="text-center fw-bold">3/ca</td>
                    <td class="text-center fw-bold">3/ca</td>
                    <td class="text-center fw-bold">3/ca</td>
                    <td class="text-center fw-bold">4/ca</td>
                    <td class="text-center fw-bold">5/ca</td>
                    <td class="text-center fw-bold">5/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center fw-bold  bg-success text-white">Bảo vệ</th>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fw-bold">1/ca</td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center">Dương Hãi Băng</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                    <td class="text-center fs-5 fw-bold"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import workingWeekCard from "@/components/workingWeekCard.vue";
export default {

    components: {
        workingWeekCard,
    }
}
</script>
<style scoped></style>