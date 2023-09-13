<script lang="ts" setup>
import AppAlert from '../components/AppAlert.vue';

import { loader } from '../stores/loader';
import axiosInstance from '../axios'
import { isAxiosError } from 'axios';
import { computed, ref } from 'vue';

// interfaces

interface ContactForm {
    email: string;
    subject: string;
    content: string
}

interface Errors {
    email?: string;
    subject?: string;
    content?: string;
    generic?: string;
}

// constants

const url = 'http://localhost:8000/api/contact-form'
const emptyForm: ContactForm = {
    email: '',
    subject: '',
    content: '',
}

// refs

const form = ref({ ...emptyForm });
const errors = ref<Errors>({});
const successMessage = ref('');

// computed

const hasErrors = computed(() => Object.keys(errors.value).length > 0)
const showAlert = computed(() => Boolean(hasErrors.value || successMessage.value));
const alertType = computed(() => hasErrors.value ? 'warning' : 'success');


const validateForm = (form: ContactForm) => {
    errors.value = {};
    const { email, subject, content } = form;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const requiredMessage = 'The %placeholder% field is required!';

    if (!email) {
        errors.value.email = requiredMessage.replace('%placeholder%', 'email');
    } else if (!email.match(emailRegex)) errors.value.email = 'The email field must be a valid email address.';

    if (!subject) {
        errors.value.subject = requiredMessage.replace('%placeholder%', 'subject');
    }

    if (!content) {
        errors.value.content = requiredMessage.replace('%placeholder%', 'content');
    }
}


const submitForm = async () => {
    successMessage.value = '';
    validateForm(form.value);

    if (hasErrors.value) return;
    try {
        loader.setLoader();
        await axiosInstance.post(url, form.value)
        form.value = { ...emptyForm }
        successMessage.value = 'Email sent successfully!'
    } catch (err) {
        //check if the caught error is an axios error
        if (isAxiosError(err)) {
            // if the error is a bad or unprocessable request (400 or 422) manipulate the error messages
            if (err.response?.status === 400 || err.response?.status === 422) {
                const errorsInResponse = err.response?.data.errors;
                for (let field in errorsInResponse) errors.value[field] = errorsInResponse[field][0];
            } else {
                // if error is axios error but not 400 or 404 respond with a generic server error message
                errors.value = { generic: 'Si è verificato un problema con il server' }
            }
        }
        else {
            // if error is not axios error it means is a front end code generated error, respond with a different generic server error message
            errors.value = { generic: 'Si è verificato un errore interno, si prega di riprovare' }
            console.error(err);
        }
    } finally {
        loader.unsetLoader();
    }

}
</script>

<template>
    <div class="small-container">

        <h2 class="text-center mb-3">Send us an email</h2>

        <AppAlert v-if="showAlert" :config="{ type: alertType }">
            <div v-if="hasErrors">
                <ul class="list-unstyled">
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <div v-else>{{ successMessage }}</div>
        </AppAlert>

        <form @submit.prevent="submitForm" novalidate>
            <!-- email -->
            <div class="mb-3">
                <label for="email">Email:</label>
                <input type="email" id="email" class="form-control"
                    :class="{ 'is-invalid': errors.email }" v-model="form.email">
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>

            <!-- subject -->
            <div class="mb-3">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" class="form-control"
                    :class="{ 'is-invalid': errors.subject }"
                    v-model="form.subject">
                <div class="invalid-feedback">
                    {{ errors.subject }}
                </div>
            </div>

            <!-- message -->
            <div class="mb-3">
                <label for="content">Message:</label>
                <textarea id="content" class="form-control" cols="30" rows="10"
                    v-model="form.content"
                    :class="{ 'is-invalid': errors.content }"></textarea>
                <div class="invalid-feedback">
                    {{ errors.content }}
                </div>
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