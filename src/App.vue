<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '@/axios.js';
import { isAxiosError } from 'axios';

const projects = ref([]);

onMounted(async () => {
  // call the api to fetch the first projects
  try {
    //set the loader
    const { data } = await axiosInstance.get('/projects');

    console.log(data);
  } catch (err) {
    //todo errors
  } finally {
    //todo unset the loader
  }
})
</script>

<template>
  <div class="container">

    <h1 class="text-center my-5">Hello World</h1>
  </div>
</template>

<style scoped></style>
