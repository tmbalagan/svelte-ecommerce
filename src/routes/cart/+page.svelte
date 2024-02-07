<script lang="ts">
	import { onMount } from 'svelte';

	import { cart } from '$lib/store/cart';
	import type { Product } from '$lib/types';
	import { isLoading } from '$lib/store/loader';

	const quantities = [1, 2, 3, 4, 5];

	$: subtotal = 0;
	let cartItems: Product[] = [];
	let SHIPPING_COST = 8;
	let TAX = 5;

	$: total = 0;

	// let unsubscribe: () => void;

	onMount(() => {
		cart.subscribe((value) => {
			cartItems = value;
			subtotal = value.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
			total = subtotal + SHIPPING_COST + TAX;
		});

		// return () => cart.clear();
	});

	const removeItem = (product: Product) => {
		cart.removeItem(product);
	};

	const updateCart = (product: Product) => {
		isLoading.set(true);
		cart.updateItem(product);
		isLoading.set(false);
	};
</script>

<div class="page-layout">
	<h2>Shopping Cart</h2>
	{#if cartItems.length > 0}
		<div class="cart">
			<div class="items">
				{#each cartItems as item}
					<div class="item-wrap">
						<div class="item-image">
							{item.image}
						</div>
						<div>
							<div class="item-summary">
								<div class="item-name">{item.name}</div>
								<select
									bind:value={item.quantity}
									class="item-quantity"
									on:change={() => updateCart(item)}
								>
									{#each quantities as quantity}
										<option value={quantity}>{quantity}</option>
									{/each}
									{#if !quantities.includes(item.quantity ?? 0)}
										<option value={item.quantity}>{item.quantity}</option>
									{/if}
								</select>
								<button on:click={() => removeItem(item)} class="remove-item">Remove</button>
							</div>
							<div class="item-price">&#8377;{item.price}</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="order-summary">
				<h2 class="summary-heading">Order summary</h2>
				<div class="summary-list">
					<div class="summary-list-heading">Subtotal</div>
					<div class="summary-list-value">&#8377;{subtotal.toFixed(2)}</div>
				</div>
				<div class="summary-list">
					<div class="summary-list-heading">Shipping estimate</div>
					<div class="summary-list-value">&#8377;{SHIPPING_COST.toFixed(2)}</div>
				</div>
				<div class="summary-list">
					<div class="summary-list-heading">Tax estimate</div>
					<div class="summary-list-value">&#8377;{TAX.toFixed(2)}</div>
				</div>
				<div class="summary-list total">
					<div class="summary-list-heading">Order total</div>
					<div class="summary-list-value">&#8377;{total.toFixed(2)}</div>
				</div>
				<button class="buy-now">Buy Now</button>
			</div>
		</div>
	{:else}
		<h3>🛒 Your cart is empty.</h3>
	{/if}
</div>

<style>
	.cart {
		display: flex;
		gap: 10rem;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.items {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 2rem;
		flex: 0 1 45rem;
	}

	.item-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 4rem;
		border-top: 1px solid var(--border-color-primary);
		padding-top: 2rem;
	}

	.item-image {
		font-size: 5rem;
		border: 1px solid var(--border-color-primary);
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
	.item-summary {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 4rem;
	}

	.item-name,
	.item-price {
		font-size: var(--font-size-base);
		color: var(--color-text-primary);
		font-weight: var(--font-weight-regular);
	}

	.item-price {
		font-weight: var(--font-weight-medium);
	}

	.remove-item {
		font-size: var(--font-size-base);
		color: var(--royal-blue-color);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		background-color: var(--color-text-white);
		border: none;
	}

	.item-quantity {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		border-radius: 0.5rem;
		padding: 0.375rem;
		background-color: var(--backgroundcolor-primary);
	}

	.order-summary {
		background-color: #f9fafb;
		padding: 2rem;
		border-radius: 0.5rem;
		flex: 0 1 25rem;
	}

	.summary-heading {
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-medium);
		color: var(--color-text-primary);
		margin: 0;
	}
	.summary-list {
		display: flex;
		gap: 2rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--border-color-primary);
		justify-content: space-between;
	}

	.summary-list.total {
		border-bottom: none;
	}

	.summary-list-heading,
	.summary-list-value {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-regular);
		color: var(--color-text-primary);
	}
	.summary-list-value {
		font-weight: var(--font-weight-medium);
	}

	.summary-list.total .summary-list-heading,
	.summary-list.total .summary-list-value {
		font-weight: var(--font-weight-semibold);
	}

	.buy-now {
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-medium);
		background-color: var(--royal-blue-color);
		width: 100%;
		border: none;
		padding: 0.5rem;
		border-radius: 0.5rem;
		color: var(--color-text-white);
		cursor: pointer;
	}
	.buy-now:is(:hover) {
		background-color: #4338ca;
	}
</style>
