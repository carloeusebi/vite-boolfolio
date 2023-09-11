<script setup>
defineProps({
    links: Array,
    currentPage: Number
})
const emit = defineEmits(['page-change'])
</script>

<template>
    <nav>
        <ul class="pagination">
            <li v-for="link in links" class="page-item"
                :class="[{ active: link.label == currentPage }]">
                <button class="page-link" v-html="link.label"
                    :class="{ disabled: !link.url }" :disabled="!link.url"
                    @click="emit('page-change', link.url)"></button>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>