<script setup>
import { computed } from 'vue';

const props = defineProps({
    config: Object
})

const alertType = computed(() => {
    switch (props.config.type) {
        case 'success':
            return 'alert-success'
        case 'warning':
            return 'alert-warning'
        default:
            return 'alert-info'
    }
})

</script>

<template>
    <div class="alert" :class="alertType" role="alert" v-html="config.message">

    </div>
</template>

<style scoped></style>