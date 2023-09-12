import { reactive } from 'vue';

export const loader = reactive({
	isLoading: false,
	setLoader() {
		this.isLoading = true;
	},
	unsetLoader() {
		this.isLoading = false;
	},
});
