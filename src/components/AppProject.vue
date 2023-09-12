<script setup>
import { computed } from 'vue';
import ProjectType from './ProjectType.vue';

const props = defineProps({
    project: Object,
});
const backendUrl = 'http://localhost:8000/storage/';
const thumbnail = computed(() => props.project.thumbnail
    ? backendUrl + props.project.thumbnail
    : '');

const formattedCreatedAtDate = computed(() => {
    const date = new Date(props.project.created_at);

    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${date.toLocaleDateString()} ${hour}:${minutes}`;
})
</script>

<template>
    <div class="d-flex gap-3 border-bottom border-dark-subtle mb-3">
        <!-- left column -->
        <figure v-if="thumbnail">
            <img :src="thumbnail" :alt="project.name" />
        </figure>
        <div class="flex-grow-1">
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
            <ProjectType v-if="project.type" :type="project.type" />
        </div>
        <div class="d-flex flex-column ">
            <div class="flex-grow-1 d-flex align-items-center justify-content-end ">
                <RouterLink
                    :to="{ name: 'project-details', params: { id: project.id } }"
                    class="btn btn-success ">
                    Details
                </RouterLink>
            </div>
            <div class="align-self-end text-end ">
                <strong>Created at: </strong>
                {{ formattedCreatedAtDate }}
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    max-width: 100px;
    aspect-ratio: 1;
}
</style>
