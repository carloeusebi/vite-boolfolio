import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import ProjectDetails from '@/pages/ProjectDetails.vue';
import TypeProjects from '@/pages/TypeProjects.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ component: HomePage, name: 'home', path: '/' },
		{ component: ProjectDetails, name: 'project-details', path: '/project/:id' },
		{ component: TypeProjects, name: 'type-projects', path: '/type/:id/projects' },
	],
});

export { router };
