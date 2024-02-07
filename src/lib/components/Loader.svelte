<script>
	import { isLoading } from '$lib/store/loader';
</script>

{#if $isLoading}
	<div class="overlay">
		<div class="spinner"></div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.1); /* Light overlay */
		backdrop-filter: blur(1px); /* Blur effect for the background */
		z-index: 9999; /* Ensure it covers other content */
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border-left-color: #09f;
		animation: spin 1s ease infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
