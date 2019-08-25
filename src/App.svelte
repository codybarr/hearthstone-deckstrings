<script>
	import DeckList from './components/DeckList.svelte'
	import HearthstoneIcon from './components/HearthstoneIcon.svelte'
	import axios from 'axios'

	// import deck from './deck' // for testing
	let deck = ''
	let deckstring = ''
	let loading = false
	let error = ''

	console.log(
		'Howdy, thanks for visiting. Try the following deckstring for an example:'
	)
	console.log(
		'AAECAa0GAqUJqaUDDvsB5QSIBfYH0QrWCvIM+wzQ/gKXhwOClAOYmwOvpQOfqQMA'
	)

	async function submit() {
		deck = ''
		error = ''
		loading = true
		try {
			const response = await axios.post('/api/deckstring', { deckstring })
			deck = response.data
		} catch (err) {
			error = `🤔 Hm...something's not quite right with that deckstring. Try again.`
		} finally {
			loading = false
		}
	}
</script>

<style lang="postcss">

</style>

<div
	class="px-5 py-4 bg-gray-800 text-white border-b border-1 border-gray-300
	relative flex items-center">
	<h1 class="text-xl">Deckstrings</h1>
	<div class="flex flex-stretch absolute right-0">
		<input
			class="bg-gray-200 text-base text-gray-700 border border-gray-300 rounded
			px-3 mr-5 leading-tight focus:outline-none focus:bg-white w-96"
			type="text"
			aria-label="Enter deckstring"
			placeholder="enter deckstring"
			bind:value={deckstring} />
		<button
			class="px-5 py-2 bg-blue-700 text-white text-base mr-5 rounded
			hover:bg-blue-300 hover:text-gray-900"
			on:click|preventDefault={submit}>
			Submit
		</button>
	</div>
</div>

<div class="p-5">
	{#if loading}
		<p>Loading...</p>
	{/if}

	{#if error}
		<p>{error}</p>
	{/if}

	{#if deck !== ''}
		<div class="text-center">
			<HearthstoneIcon
				name={deck.hero.cardClass.toLowerCase()}
				classes="inline-block w-20 h-20 fill-current text-black mb-4 mx-auto" />
		</div>
		<DeckList {deck} />
	{/if}
</div>
