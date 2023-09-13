<script lang="ts" setup>
import { ref } from 'vue';
import AppAlert from '../components/AppAlert.vue';

interface ContactForm {
    email: string;
    subject: string;
    content: string
}

const emptyForm = {
    email: '',
    subject: '',
    content: '',
}

const form = ref(emptyForm);
const url = 'http://localhost:8000/api/contact-form'

const submitForm = () => {
    return true;
}
</script>

<template>
    <div class="small-container">

        <h2 class="text-center mb-3">Send us an email</h2>

        <!-- todo
    <AppAlert />
-->

        <form @submit.prevent="submitForm" novalidate>
            <!-- email -->
            <div class="mb-3">
                <label for="email">Email:</label>
                <input type="email" id="email" class="form-control"
                    v-model="form.email">
            </div>

            <!-- subject -->
            <div class="mb-3">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" class="form-control"
                    v-model="form.subject">
            </div>

            <!-- message -->
            <div class="mb-3">
                <label for="content">Message:</label>
                <textarea id="content" class="form-control" cols="30"
                    rows="10"></textarea>
            </div>

            <div class="d-flex justify-content-end ">
                <button class="btn btn-success px-5">Send</button>
            </div>

        </form>
    </div>
</template>

<style scoped>
.small-container {
    max-width: 700px;
    margin: 0 auto;
}
</style>