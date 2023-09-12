<script setup>
import { useRoute } from 'vue-router';
import axiosInstance from '@/axios.js';
import { computed, onMounted, ref } from 'vue';
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

const backendUrl = 'http://localhost:8000/storage/'
const thumbnail = computed(() => project.value.thumbnail
    ? backendUrl + project.value.thumbnail
    : ''
)

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
    <RouterLink :to="{ name: 'home' }" class="btn btn-secondary">
        Back
    </RouterLink>

    <div v-if="!loader.isLoading">
        <!-- temporary dump -->
        <div v-if="project">
            <h1>{{ project.name }}</h1>
            <div class="d-flex my-3">
                <figure>
                    <img :src="thumbnail" :alt="project.name">
                </figure>
                <div class="ms-3">
                    <div><strong>Project Name: </strong>{{ project.name }}</div>
                    <div v-if="project.url">
                        <strong>Url: </strong>
                        <a :href="project.url" target="_blank">{{ project.url }}</a>
                    </div>
                    <div v-if="project.github_url">
                        <font-awesome-icon :icon="['fab', 'github']" size="lg" />:
                        <a :href="project.url" target="_blank">{{ project.github_url
                        }}</a>
                    </div>
                    <p class="description mt-2">
                        {{ project.description }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else>
            <AppAlert :config="alertConfig" />
        </div>

    </div>
</template>

<style scoped>
.description {
    text-align: justify;
}
</style>