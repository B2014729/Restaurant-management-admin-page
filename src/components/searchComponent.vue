<template>
    <form @submit.prevent="submit">
        <div class="d-flex">
            <button type="submit" class="btn btn-outline-secondary me-1"><i
                    class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" class="form-control" placeholder="Tìm kiếm" aria-label="Recipient's username"
                name="input-search" aria-describedby="button-addon2" :value="modelValue" @keyup.enter="submit"
                @input="updateModelValue">
        </div>
    </form>
</template>

<script>
export default {

    props: {
        modelValue: {
            type: String,
            default: '',
            required: true,
        }
    },

    methods: {
        submit() {
            this.$emit('submit');
        },

        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
    }
}
</script>