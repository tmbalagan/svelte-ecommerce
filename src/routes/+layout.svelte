<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Loader from '$lib/components/Loader.svelte';
</script>

<Header />
<main>
	<Loader />
	<slot />
</main>
<Footer />
