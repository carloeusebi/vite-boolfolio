<script setup>
import AppLoader from './components/AppLoader.vue';
import { loader } from '@/stores/loader'

</script>

<template>
  <div class="container">

    <h1 class="text-center my-5 pb-3 border-bottom border-black">
      Boolfolio
    </h1>
    <AppLoader />
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
