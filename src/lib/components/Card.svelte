<script lang="ts">
	import { cart } from '$lib/store/cart';

	export let items: any;

	const addToCart = (item: any) => {
		cart.addToCart(item);
	};
</script>

<div class="card">
	{#each items as item}
		<div class="card-wrap">
			<h3 class="product-name">{item.name}</h3>
			<span class="product-image">{item.image}</span>
			<span class="product-price">Price: &#8377;{item.price}</span>
			<button class="cart-btn" on:click={() => addToCart(item)}>Cart</button>
		</div>
	{/each}
</div>

<style>
	.card {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 5rem;
	}

	.card-wrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1rem;
		border: 1px solid var(--border-color-primary);
		max-width: 300px;
		border-radius: 0.5rem;
	}

	.product-name {
		font-size: var(--font-size-base);
		color: var(--color-text-primary);
		line-height: var(--line-height-normal);
		font-weight: var(--font-weight-medium);
		margin: 0;
	}

	.product-price {
		display: block;
		font-size: var(--font-size-sm);
		color: var(--color-text-primary);
		line-height: var(--line-height-normal);
		font-weight: var(--font-weight-medium);
	}

	.product-image {
		font-size: 5vw;
		text-align: center;
	}

	.cart-btn {
		font-size: var(--font-size-base);
		color: var(--color-text-primary);
		line-height: var(--line-height-normal);
		font-weight: var(--font-weight-medium);
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: none;
		margin-top: 0.5rem;
	}

	.cart-btn:is(:hover) {
		color: var(--color-text-white);
		background-color: var(--royal-blue-color);
		cursor: pointer;
	}
</style>
