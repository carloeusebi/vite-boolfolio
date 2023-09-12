<script setup>
import AppProject from '@/components/AppProject.vue';
import AppAlert from '@/components/AppAlert.vue';
import AppPagination from '@/components/AppPagination.vue';

import { onMounted, ref } from 'vue';
import axiosInstance from '@/axios.js';
import { isAxiosError } from 'axios';
import { loader } from '@/stores/loader';

const projects = ref([]);
const links = ref([])
const currentPage = ref(1);
const alert = ref({
    type: 'info',
    message: 'No projects found'
})

const fetchProjects = async (url = 'http://localhost:8000/api/projects') => {
    loader.setLoader();
    try {
        const { data } = await axiosInstance.get(url);
        projects.value = data.data;
        links.value = data.links;
        currentPage.value = data.current_page

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
        loader.unsetLoader();
    }
}


onMounted(() => {
    fetchProjects();
})
</script>

<template>
    <div class="d-flex justify-content-end">
        <AppPagination :links="links" :current-page="currentPage"
            @page-change="fetchProjects" />
    </div>

    <div v-if="!loader.isLoading">
        <ul v-if="projects && projects.length > 0" class="list-unstyled">
            <li v-for="project in projects" :key="project.id">
                <AppProject :project="project" />
            </li>
        </ul>
        <div v-else>
            <AppAlert :config="alert" />
        </div>
    </div>
</template>

<style scoped></style>