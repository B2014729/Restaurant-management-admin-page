<template>
    <div class="alert-container">
        <div class="alert" :class="{
            success: isSuccess,
            warning: isWarning,
            danger: isDanger,
        }">
            <span style="font-size: 13px;"> <i class="me-1" :class="{
            'fa-solid fa-check': isSuccess,
            'fa-solid fa-xmark': isDanger,
            'fa-solid fa-triangle-exclamation': isWarning,
        }"></i> {{ message }}
            </span>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {

    props: {
        status: { type: String },
        message: { type: String }
    },
    setup(props) {
        let isSuccess = ref(false);
        let isWarning = ref(false);
        let isDanger = ref(false);
        switch (props.status) {
            case 'success':
                isSuccess.value = true;
                break;
            case 'warning':
                isWarning.value = true;
                break;
            case 'danger':
                isDanger.value = true;
                break;
            default:
                break;
        }
        return { isSuccess, isWarning, isDanger };
    }
}

</script>

<style scoped>
.alert-container {
    position: relative;
}

.alert {
    position: absolute;
    top: -70px;
    right: 0px;
    width: 400px;
    color: black;
    animation-name: showAnimation;
    animation-duration: 300ms;
}

@keyframes showAnimation {
    0% {
        margin-right: -50px;
    }

    100% {
        margin-right: 0px;
    }
}

.success {
    background-color: rgba(0, 128, 0, 0.558);
}

.warning {
    background-color: rgba(255, 255, 0, 0.607);
}

.danger {
    background-color: rgba(207, 13, 2, 0.566);
}
</style>
