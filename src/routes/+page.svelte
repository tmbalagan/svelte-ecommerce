<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	let products = {
		vegetables: [
			{
				id: 1,
				name: 'Avocoda',
				price: 10,
				image: '🥑'
			},
			{
				id: 2,
				name: 'Corn',
				price: 15,
				image: '🌽'
			},
			{
				id: 3,
				name: 'Carrot',
				price: 20,
				image: '🥕'
			},
			{
				id: 4,
				name: 'Broccoli',
				price: 25,
				image: '🥦'
			}
		],
		fruits: [
			{
				id: 1,
				name: 'Lemon',
				price: 10,
				image: '🍋'
			},
			{
				id: 2,
				name: 'Apple',
				price: 15,
				image: '🍎'
			},
			{
				id: 3,
				name: 'Grapes',
				price: 20,
				image: '🍇'
			},
			{
				id: 4,
				name: 'Kiwi',
				price: 25,
				image: '🥝'
			}
		],
		clothing: [
			{
				id: 1,
				name: 'Lab Coat',
				price: 10,
				image: '🥼'
			},
			{
				id: 2,
				name: 'Sari',
				price: 15,
				image: '🥻'
			},
			{
				id: 3,
				name: 'Boot',
				price: 20,
				image: '🥾'
			},
			{
				id: 4,
				name: 'Backpack',
				price: 25,
				image: '🎒'
			}
		]
	};
</script>

<div class="page-layout">
	<Card items={products.vegetables} />
	<Card items={products.fruits} />
	<Card items={products.clothing} />
</div>
