<script>
	import axios from 'axios'

	let deckstring = ''
	let deck = ''
	let loading = false
	let error = ''

	console.log(
		'Howdy, thanks for visiting. Try the following deckstring for an example:'
	)
	console.log(
		'AAECAa0GAqUJqaUDDvsB5QSIBfYH0QrWCvIM+wzQ/gKXhwOClAOYmwOvpQOfqQMA'
	)

	async function submit() {
		console.log('Deckstring: ', deckstring)

		deck = ''
		error = ''
		loading = true
		try {
			const response = await axios.post('/api/deckstring', { deckstring })
			console.log('success: ', response)
			deck = response.data
			loading = false
		} catch (err) {
			console.error('error: ', err)
			loading = false
			error = `🤔 Hm...something's not quite right with that deckstring. Try again.`
		}
	}
</script>

<style>
	/* Scoped styles here */
</style>

<h1>Deckstrings</h1>
<input type="text" placeholder="enter deckstring" bind:value="{deckstring}" />
<button on:click="{submit}">Submit</button>

{#if loading}
<p>Loading...</p>
{/if}

{#if error !== ''}
<p>{error}</p>
{/if}

{#if deck !== ''}
<h1>{deck.hero.name} | {deck.hero.cardClass}</h1>
<table>
	{#each deck.cards as card}
	<tr>
		<td>{card.name}</td>
		<td>{card.quantity}</td>
	</tr>
	{/each}
</table>

{/if}
