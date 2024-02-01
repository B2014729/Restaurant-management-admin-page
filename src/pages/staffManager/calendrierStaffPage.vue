<template>
    <div class="p-3">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <h4 class="text-secondary fw-bold">Lịch làm việc__:</h4>
                <h5 class="fw-bold text-success ms-3 mt-1">1/12/2023 - 1/1/2024</h5>
            </div>
            <button class="btn btn-outline-success h-100">Xếp lịch</button>
        </div>
        <div class="d-flex">
            <ul class="d-flex">
                <li style="list-style: none;" class="me-4 text-success"><i class="fa-solid fa-circle  text-success"></i>
                    Ca sáng (1)
                </li>
                <li style="list-style: none;" class="me-4 text-warning"><i class="fa-solid fa-circle  text-warning"></i>
                    Ca chiều (2)
                </li>
                <li style="list-style: none;" class="me-4 text-dark"><i class="fa-solid fa-circle  text-dark"></i>
                    Ca tối (3)
                </li>
                <li style="list-style: none;" class="me-4 text-danger"><i class="fa-solid fa-circle  text-danger"></i>
                    Ca full (4)
                </li>
                <li style="list-style: none;" class="me-4 text-primary"><i class="fa-solid fa-circle text-primary"></i>
                    Ca sáng + chiều (5)
                </li>
                <li style="list-style: none;" class="me-4 text-secondary"><i class="fa-solid fa-circle  text-secondary"></i>
                    Ca chiều + tối (6)
                </li>
            </ul>

        </div>
        <div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse1Example" aria-expanded="false" aria-controls="collapse1Example">
                    Lịch làm việc tuần 1 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse1Example">
                    <div class="card card-body">
                        <workingWeekComponent></workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse2Example" aria-expanded="false" aria-controls="collapse2Example">
                    Lịch làm việc tuần 2 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse2Example">
                    <div class="card card-body">
                        <workingWeekComponent></workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse3Example" aria-expanded="false" aria-controls="collapse3Example">
                    Lịch làm việc tuần 3 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                </button>
                <div class="collapse" id="collapse3Example">
                    <div class="card card-body">
                        <workingWeekComponent></workingWeekComponent>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div>
                    <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse4Example" aria-expanded="false" aria-controls="collapse4Example">
                        Lịch làm việc tuần 4 <i class="fa-solid fa-chevron-down ms-2" style="font-size: 12px;"></i>
                    </button>
                    <div class="collapse" id="collapse4Example">
                        <div class="card card-body">
                            <workingWeekComponent></workingWeekComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-scroll">
                <button class="btn btn-outline-secondary rounded-circle" @click="scrollToTop">
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import workingWeekComponent from '@/components/workingWeekComponent.vue';
export default {
    components: {
        workingWeekComponent,
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}
</script>

<style scoped>
.button-scroll {
    position: fixed;
    bottom: 10px;
    right: 20px;
}
</style>