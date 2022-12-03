<script>
	import Piano from '$lib/piano.svelte';
</script>

<div class="wrapper">
	<Piano />
</div>

<style>
	.wrapper {
		align-items: center;
		display: flex;
		justify-content: center;
		height: 100vh;
		width: 100vw;
	}
	:global(svg) {
		margin: auto;
	}
	:global(.white-keys) {
		fill: white;
	}
	:global(.white-keys:hover) {
		fill: #ffd200;
	}
	:global(.black-keys) {
		fill: black;
	}
	:global(.black-keys:hover) {
		fill: #f40082;
	}
	:global(body) {
		background-color: #37b2c3;
	}
</style>
