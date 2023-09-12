<script setup>
import { useRoute } from 'vue-router';
import axiosInstance from '@/axios.js';
import { onMounted, ref } from 'vue';
import { loader } from '../stores/loader';

const id = useRoute().params.id;
const project = ref(null);
const url = `http://localhost:8000/api/projects/${id}`

const fetchProject = async () => {
    loader.setLoader();
    try {
        const { data } = await axiosInstance.get(url);
        project.value = data;
        console.log(project.value)
    } catch (err) {

    } finally {
        loader.unsetLoader();
    }
}

onMounted(() => {
    fetchProject();
})

</script>

<template>
    <div v-if="!loader.isLoading">
        <!-- temporary dump -->
        {{ project }}
    </div>
</template>

<style scoped></style>