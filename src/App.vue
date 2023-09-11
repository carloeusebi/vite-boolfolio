<script setup>
import { onMounted, ref } from 'vue';
import axiosInstance from '@/axios.js';
import { isAxiosError } from 'axios';
import AppProject from './components/AppProject.vue';

const projects = ref([]);

onMounted(async () => {
  // call the api to fetch the first projects
  try {
    //set the loader
    const { data } = await axiosInstance.get('/projects');
    projects.value = data.data;

  } catch (err) {
    //todo errors
  } finally {
    //todo unset the loader
  }
})
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5 pb-3 border-bottom border-black">
      Boolfolio
    </h1>

    <ul class="list-unstyled">
      <li v-for="project in projects" :key="project.id">
        <AppProject :project="project" />
      </li>
    </ul>

  </div>
</template>

<style scoped></style>
