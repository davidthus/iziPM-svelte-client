/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writable } from 'svelte/store';

const usePersist = () => {
	const persist = writable<boolean>(
		localStorage.getItem('persist') !== null ? JSON.parse(localStorage.getItem('persist')!) : false
	);

	persist.subscribe((persistValue: boolean) => {
		localStorage.setItem('persist', JSON.stringify(persistValue));
	});

	return [persist];
};

export default usePersist;
