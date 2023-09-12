<script lang="ts"  setup>
interface ProjectType {
    label: string;
    color: string;
}

interface Props {
    type: ProjectType
}

defineProps<Props>()
</script>

<template>
    <div class="badge px-3" :style="`background-color: ${type.color}`">
        {{ type.label }}
    </div>
</template>

<style scoped></style>