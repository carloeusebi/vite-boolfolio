import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ProjectDetails from '@/pages/ProjectDetails.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ component: HomePage, name: 'home', path: '/' },
		{ component: ProjectDetails, name: 'project-details', path: '/project/:id' },
	],
});

export { router };
