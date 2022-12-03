<script lang="ts">
	import { onMount } from 'svelte';
	import Piano from '$lib/piano.svelte';

	let piano: any;

	onMount(() => {
		let keys = piano.$$.root.children[0].children[0].children;
		const elements: Element[] = Array.from(keys);
		elements.forEach((el: Element, index: number) => {
			el.addEventListener('click', () => {
				new Audio(`src/static/audio/key-${index + 1}.mp3`).play();
			});
		});
	});
</script>

<div class="wrapper">
	<Piano bind:this={piano} />
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
