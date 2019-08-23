<script>
	import HearthstoneIcon from './HearthstoneIcon.svelte'
	export let card

	let showImage = false
	let loaded = false

	let pos = { x: 0, y: 0 }

	let rarityColors = {
		FREE: 'text-black',
		COMMON: 'text-yellow-500',
		RARE: 'text-blue-400',
		EPIC: 'text-purple-600',
		LEGENDARY: 'text-orange-600'
	}

	$: colorClass = rarityColors[card.rarity]
</script>

<style lang="postcss">
	a:hover {
		@apply underline;
	}

	li {
		@apply my-2;
	}
</style>

<li class="font-bold flex flex-row items-center max-w-xs">
	<div class="flex-1 pr-3">
		<a
			on:mouseover={() => {
				showImage = true
				loaded = true
			}}
			on:mouseout={() => (showImage = false)}
			on:mousemove={event => {
				pos.x = event.screenX + 20
				pos.y = event.screenY - 300
			}}
			class="{colorClass} flex-1 pr-3"
			href="https://s3.wasabisys.com/hearthstone/{card.dbfId}.png"
			alt="this is a link"
			target="_blank">
			{card.name}
		</a>
	</div>
	<span class="flex items-center">
		<span class="pr-1">{card.cost}</span>
		<HearthstoneIcon
			name="mana-crystal"
			classes="inline-block w-4 h-4 fill-current text-indigo-600" />
	</span>

	{#if loaded}
		<img
			class="absolute"
			class:invisible={!showImage}
			style="top: {pos.y}px; left: {pos.x}px"
			width="250"
			src="https://s3.wasabisys.com/hearthstone/{card.dbfId}.png"
			alt={card.name} />
	{/if}
</li>
