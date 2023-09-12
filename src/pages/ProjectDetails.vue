<script setup>
import { useRoute } from 'vue-router';
import axiosInstance from '@/axios.js';
import { onMounted, ref } from 'vue';

const id = useRoute().params.id;
const project = ref(null);
const url = `http://localhost:8000/api/projects/${id}`

const fetchProject = async () => {
    // set loader
    try {
        const { data } = await axiosInstance.get(url);
        project.value = data;
        console.log(project.value)
    } catch (err) {

    } finally {
        // unset loader
    }
}

onMounted(() => {
    fetchProject();
})

</script>

<template></template>

<style scoped></style>