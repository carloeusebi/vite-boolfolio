<script setup>
const links = [
    { name: 'HomePage', to: 'home' },
    { name: 'Contact', to: 'contact' }
];
</script>

<template>
    <header class="border-bottom border-black my-3">
        <h1 class="text-center">
            Boolfolio
        </h1>
        <nav>
            <ul class="list-unstyled d-flex justify-content-center gap-3">
                <li v-for="link in links" :key="link.to">
                    <RouterLink :to="{ name: link.to }"
                        class="text-black text-decoration-none ">
                        {{ link.name }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped></style>