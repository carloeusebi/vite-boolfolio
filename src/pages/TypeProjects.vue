<script lang="ts" setup>
import { useRoute } from 'vue-router';

const id = useRoute().params.id;


</script>

<template>
    {{ id }}
</template>

<style scoped></style>