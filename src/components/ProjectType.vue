<script lang="ts"  setup>
interface ProjectType {
    id: number
    label: string;
    color: string;
}

interface Props {
    type: ProjectType
}

defineProps<Props>()
</script>

<template>
    <RouterLink :to="{ name: 'type-projects', params: { id: type.id } }">
        <div class="badge px-3" :style="`background-color: ${type.color}`">
            {{ type.label }}
        </div>
    </RouterLink>
</template>

<style scoped></style>