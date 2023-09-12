<script setup>
import AppProject from '../components/AppProject.vue'

import { useRoute } from 'vue-router';
import { loader } from '../stores/loader'
import axiosInstance from '../axios'
import { onMounted, ref } from 'vue';

const id = useRoute().params.id;
const url = `http://localhost:8000/api/types/${id}/projects`
const total = ref(null);
const projects = ref(null);
const type = ref(null);

const fetchProjects = async () => {
    loader.setLoader();
    try {
        const { data } = await axiosInstance.get(url);
        projects.value = data.projects;
        total.value = data.total;
        type.value = data.type;

    } catch (err) {

    } finally {
        loader.unsetLoader();
    }
}

onMounted(() => { fetchProjects() })
</script>

<template>
    <RouterLink :to="{ name: 'home' }" class="btn btn-secondary mb-3">Back
    </RouterLink>
    <div v-if="projects">
        <h1>{{ type.label }} <small>({{ total }})</small></h1>
        <hr class="my-3">
        <ul class="list-unstyled ">
            <li v-for="project in projects" :key="project.id">
                <AppProject :project="project" />
            </li>
        </ul>
    </div>
    <div v-else-if="!projects && !loader.isLoading">
    </div>
</template>

<style scoped></style>