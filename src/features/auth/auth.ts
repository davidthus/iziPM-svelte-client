import { writable } from 'svelte/store';

export const auth = writable<{ token: string; userId: string }>({ token: '', userId: '' });

export function setCredentials(token: string, userId: string) {
	auth.set({ token, userId });
}

export function logOut() {
	auth.set({ token: '', userId: '' });
}
