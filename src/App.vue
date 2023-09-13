<script setup>
import AppLoader from './components/AppLoader.vue';
import { loader } from '@/stores/loader'
import TheHeader from './components/TheHeader.vue';

</script>

<template>
  <div class="container">

    <TheHeader />
    <AppLoader />
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
