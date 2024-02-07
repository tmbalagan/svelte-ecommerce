<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/store/cart';
	import '../../app.css';

	$: cart_count = 0;

	onMount(() => {
		cart.subscribe((value) => {
			const count = value.reduce((prev, curr) => prev + curr.quantity, 0);
			cart_count = count;
		});

		return () => cart.clear();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<header>
	<nav class="h-container">
		<div class="h-row">
			<div>
				<a href="/" class="h-nav-link" title="Home">Home 🏠</a>
			</div>
			<div class="h-nav-menus">
				<a href="/" class="h-nav-link" title="Grocery">Grocery 🫕</a>
				<a href="/" class="h-nav-link" title="Vegetables">Vegetables 🌽</a>
				<a href="/" class="h-nav-link" title="Fruits">Fruits 🍎</a>
			</div>
			<div class="h-nav-menus">
				<a href="/cart" class="h-nav-link" title="Cart"
					>Cart 🛒 ({cart_count > 0 ? cart_count : 0})</a
				>
				<a href="/" class="h-nav-link" title="Login">Login 👤</a>
			</div>
		</div>
	</nav>
</header>

<style>
	header {
		padding: 0 2rem;
		max-width: var(--max-page-width);
		margin: 0 auto;
	}

	.h-container {
		border-bottom: 1px solid var(--border-color-primary);
	}

	.h-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4rem;
	}

	.h-nav-menus {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.h-nav-link {
		font-weight: var(--font-weight-regular);
		text-decoration: none;
		color: var(--color-text-primary);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-normal);
	}

	.h-nav-link:is(:hover, :active, :focus) {
		color: var(--color-text-primary-hover);
	}
</style>
