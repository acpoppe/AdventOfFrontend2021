<script lang="ts">
	import type { Key } from './key.type';
	const height = 65;

	export let key: Key;

	$: isCharacter = key.key.length === 1;
</script>

<div
	class="key {isCharacter ? 'character' : 'word'} {key.isAnimating ? 'animating' : ''}"
	style="height: {height}px; width: {key.width}px;"
>
	<span>{key.key}</span>
</div>

<style>
	@keyframes jiggle {
		0% {
			transform: translate(0, 0);
		}
		12% {
			transform: translate(5px, -5px);
		}
		25% {
			transform: translate(0, 0);
		}
		37% {
			transform: translate(-5px, 5px);
		}
		50% {
			transform: translate(0, 0);
		}
		67% {
			transform: translate(-5px, -5px);
		}
		75% {
			transform: translate(0, 0);
		}
		87% {
			transform: translate(5px, 5px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	.key {
		align-items: center;
		background-color: white;
		border-radius: 16px;
		display: flex;
		justify-content: center;
	}

	.key:hover {
		background-color: var(--gold);
	}

	.character {
		color: var(--teal);
	}

	.word {
		color: var(--gray);
	}

	span {
		font-family: 'Inter', sans-serif;
		text-align: center;
		text-transform: uppercase;
	}

	.animating {
		animation: jiggle 1s;
		animation-iteration-count: infinite;
		background: #60c1b6;
		color: white;
	}
</style>
