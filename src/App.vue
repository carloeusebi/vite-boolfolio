<script setup>
import AppProject from './components/AppProject.vue';
import AppLoader from './components/AppLoader.vue'

import { onMounted, ref } from 'vue';
import axiosInstance from '@/axios.js';
import { isAxiosError } from 'axios';
import AppAlert from './components/AppAlert.vue';

const projects = ref([]);
const isLoading = ref(false);
const alert = ref({
  type: 'info',
  message: 'No projects found'
})

onMounted(async () => {
  isLoading.value = true;
  try {
    const { data } = await axiosInstance.get('/projects');
    projects.value = data.data;

  } catch (err) {
    alert.value.type = 'warning';
    if (isAxiosError(err)) {
      const status = err.response.status;
      alert.value.message = `Error ${status}`
    }
    else {
      alert.value.message = "Ops! Something went wrong, try to reload the page!"
    }
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="container">
    <h1 class="text-center my-5 pb-3 border-bottom border-black">
      Boolfolio
    </h1>

    <AppLoader v-if="isLoading" />
    <div v-else>
      <ul v-if="projects && projects.length > 0" class="list-unstyled">
        <li v-for="project in projects" :key="project.id">
          <AppProject :project="project" />
        </li>
      </ul>
      <div v-else>
        <AppAlert :config="alert" />
      </div>
    </div>

  </div>
</template>

<style scoped></style>
