<template>
    <div class="p-2">
        <div class=" d-flex border-bottom">
            <div class="rounded-circle bg-secondary h-100 mt-2 me-2">
                <i class="fa-solid fa-user-tie p-2"></i>
            </div>
            <div>
                <!-- <span style="font-size: 12px;">{{ evaluate.tendangnhap }}</span> -->
                <p style="font-size: 13px; margin: 0;">{{ formatDate(evaluate.thoigian) }}</p>
                <div>
                    <span v-for="n in evaluate.sosao" :key="n">
                        <i class="fa-solid fa-star text-warning" style="font-size: 8px;"></i>
                    </span>
                </div>
                <p style="font-size: 13px;">{{ evaluate.noidung }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        evaluate: {
            type: Object
        }
    },
    setup() {
        function formatDate(date) {
            let newDate = new Date(date);
            let dateIn = newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
            let month = (newDate.getMonth() + 1) >= 10 ? (newDate.getMonth() + 1) : `0${(newDate.getMonth() + 1)}`;
            let year = newDate.getFullYear() >= 10 ? newDate.getFullYear() : `0${newDate.getFullYear()}`;

            return `${dateIn}/${month}/${year}`;
        }

        return {
            formatDate,
        };
    }
}
</script>