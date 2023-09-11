<script setup>

</script>

<template>
    <div class="layover">
        <font-awesome-icon class="text-white" :icon="['fas', 'circle-notch']" spin
            size="2xl" />
    </div>
</template>

<style scoped>
.layover {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    inset: 0;

    background-color: rgba(0, 0, 0, .75);
}
</style>