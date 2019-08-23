<script>
	import CardRow from './CardRow.svelte'

	export let deck

	$: classCards = deck.cards
		.filter(card => card.cardClass !== 'NEUTRAL')
		.sort((a, b) => a.cost - b.cost)
	$: neutralCards = deck.cards.filter(card => card.cardClass === 'NEUTRAL')
	$: minionCards = deck.cards.filter(card => card.type === 'MINION')
	$: spellCards = deck.cards.filter(card => card.type === 'SPELL')

	$: manaCurve = deck.cards.reduce(function(acc, curr) {
		acc[curr.cost] ? acc[curr.cost]++ : (acc[curr.cost] = 1)

		return acc
	}, {})

	$: className =
		deck.hero.cardClass[0] +
		deck.hero.cardClass.slice(1, deck.hero.cardClass.length).toLowerCase()

	$: console.log('Deck: ', deck)
	$: console.log('manaCurve: ', manaCurve)
</script>

<style>

</style>

<div class="flex flex-col md:flex-row justify-center max-w-xl mx-auto">

	{#if classCards.length > 0}
		<div class="w-full mx-auto px-3">
			<h2
				class="uppercase text-sm font-bold bg-teal-800 text-white py-1 px-2
				rounded">
				{className} Cards ({classCards.length})
			</h2>
			<ul>
				{#each classCards as card}
					<CardRow {card} />
				{/each}
			</ul>
		</div>
	{/if}

	{#if classCards.length > 0}
		<div class="w-full mx-auto px-3">
			<h2
				class="uppercase text-sm font-bold bg-teal-800 text-white py-1 px-2
				rounded">
				Neutral Cards ({neutralCards.length})
			</h2>
			<ul>
				{#each neutralCards as card}
					<CardRow {card} />
				{/each}
			</ul>
		</div>
	{/if}
</div>
