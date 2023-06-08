import { writable } from 'svelte/store';

export const auth = writable<{ accessToken: string; userId: string }>({
	accessToken: '',
	userId: ''
});

export function setCredentials(accessToken: string, userId: string) {
	auth.set({ accessToken, userId });
}

export function logOut() {
	auth.set({ accessToken: '', userId: '' });
}
