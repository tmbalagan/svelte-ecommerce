import { writable } from 'svelte/store';
import { browser, dev } from '$app/environment';

import type { Product, CartItem } from '$lib/types';

// Function to help save the cart to localstorage
function persistCart(items: CartItem[]): void {
	localStorage.setItem('cart', JSON.stringify(items));
}

function createCart() {
	const defaultCart: CartItem[] = [];

	// localStorage Parsing: The parsing of localStorage now explicitly falls back to '[]' (an empty array as a string) if nothing is found, ensuring the parsed result is always of type CartItem[].
	const initialState: CartItem[] = browser
		? JSON.parse(localStorage.getItem('cart') || '[]')
		: defaultCart;
	const { subscribe, set, update } = writable(initialState);

	return {
		subscribe,
		// initially if quantity not available in addToCart, so Product keep quantity is optional
		addToCart: (product: Product): void => {
			update((items: CartItem[]) => {
				let found = items.find((item: CartItem) => item.id === product.id);
				if (found?.quantity) {
					found.quantity += 1;
				} else {
					items.push({ ...product, quantity: 1 });
				}
				persistCart(items);
				return items; // for subscribe
			});
		},
		removeItem: (product: Product): void => {
			update((items: CartItem[]) => {
				let index = items.findIndex((item: CartItem) => item.id === product.id);
				items.splice(index, 1);
				persistCart(items);
				return items; // for subscribe
			});
		},
		updateItem: (product: Product): void => {
			update((items: CartItem[]) => {
				items.map((item: CartItem) => {
					if (item.id === product.id) {
						// use nullish quantity always be number, Fallback to 0 if product.quantity is undefined
						item.quantity = product.quantity ?? 0;
					}
					return item;
				});

				persistCart(items);
				return items; // for subscribe
			});
		},
		clear: () => {
			set([]);
			persistCart([]);
		}
	};
}

export const cart = createCart();
