<template>
    <div class="p-2">
        <div class="d-flex border-bottom">
            <div class="rounded-circle bg-secondary h-100 mt-2 me-2">
                <i class="fa-solid fa-user-tie p-2"></i>
            </div>
            <div>
                <span style="font-size: 12px;">haibang</span>
                <p style="font-size: 13px; margin: 0;">19/1/2024</p>
                <div>
                    <span v-for="n in evaluate" :key="n">
                        <i class="fa-solid fa-star text-warning" style="font-size: 8px;"></i>
                    </span>
                </div>
                <p style="font-size: 13px;">day la thong tin danh gia</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            evaluate: 4,
        };
    }
}
</script>