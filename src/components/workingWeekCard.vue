<template>
    <div class="d-flex justify-content-center align-item-center">
        <div class="card-day px-2" :class="{
            morning: isMorning, afternoon: isAfternoon,
            evening: isEvening, full: isFull,
            morningAndAfter: isMorningAndAfter,
            afterAndEvening: isAfterAndEvening,
        }">
            <span style="font-size: 14px;">{{ startTime }} - {{ endTime }}</span>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    props: {
        id: {
            type: Number
        },
    },

    setup(props) {
        let isMorning = ref(false);
        let isAfternoon = ref(false);
        let isEvening = ref(false);
        let isFull = ref(false);
        let isMorningAndAfter = ref(false);
        let isAfterAndEvening = ref(false);
        let startTime = ref('_');
        let endTime = ref('_');
        // let buttonAdd = ref(false);
        // let buttonRemove = ref(true);

        switch (props.id) {
            case 1:
                isMorning.value = true;
                startTime.value = '06:00';
                endTime.value = '12:00';
                break;
            case 2:
                isAfternoon.value = true;
                startTime.value = '12:00';
                endTime.value = '18:00';
                break;
            case 3:
                isEvening.value = true;
                startTime.value = '18:00';
                endTime.value = '00:00';
                break;
            case 4:
                isFull.value = true;
                startTime.value = '06:00';
                endTime.value = '00:00';
                break;
            case 5:
                isMorningAndAfter.value = true;
                startTime.value = '06:00';
                endTime.value = '18:00';
                break;
            case 6:
                isAfterAndEvening.value = true;
                startTime.value = '12:00';
                endTime.value = '00:00';
                break;
            default:
                // buttonRemove.value = false;
                // buttonAdd.value = true;
                break;
        }
        return {
            isMorning, isEvening, isAfternoon,
            isFull, startTime, endTime, isMorningAndAfter,
            isAfterAndEvening,
        };
    }
}
</script>

<style scoped>
.card-day {
    margin-top: 5px;
}

.morning {
    background-color: rgba(0, 128, 0, 0.692);
}

.afternoon {
    background-color: rgba(255, 166, 0, 0.645);
}

.evening {
    background-color: rgba(0, 0, 0, 0.982);
    color: grey;
}

.full {
    background-color: rgba(255, 0, 0, 0.708);
}

.morningAndAfter {
    background-color: rgba(0, 0, 255, 0.701);
}

.afterAndEvening {
    background-color: rgba(128, 128, 128, 0.859);
}

button {
    border: none;
}
</style>