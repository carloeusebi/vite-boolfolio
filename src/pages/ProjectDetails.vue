<script setup>
import { useRoute } from 'vue-router';
import axiosInstance from '@/axios.js';
import { onMounted, ref } from 'vue';
import { loader } from '../stores/loader';
import { isAxiosError } from 'axios';
import AppAlert from '../components/AppAlert.vue';

const id = useRoute().params.id;
const project = ref(null);
const url = `http://localhost:8000/api/projects/${id}`
const alertConfig = ref({
    type: 'info',
    message: `No project found with ID ${id}`
})

const fetchProject = async () => {
    loader.setLoader();
    try {
        const { data } = await axiosInstance.get(url);
        project.value = data;
    } catch (err) {
        // not very friendly for the customer, i know, but this shows error code and message, just to do something different :)
        if (isAxiosError(err) && err.response.status !== 404) {
            alertConfig.value.type = 'warning';
            alertConfig.value.message = `Error: ${err.response.status}: ${err.response.data.message}`
        }
        else {
            //if it is not axios error just console log the error for debugging.
            console.error(err);
        }
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
        <div v-if="project">
            {{ project }}
        </div>
        <div v-else>
            <AppAlert :config="alertConfig" />
        </div>

    </div>
</template>

<style scoped></style>