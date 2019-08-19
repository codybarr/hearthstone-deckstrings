const cards = require('./cards.json')
const { encode, decode, FormatType } = require('deckstrings')
import 'core-js/modules/es.array.find'

function convertDeck(deck) {
	let convertedDeck = {}
	let cardsInDeck = deck.cards.map(card => {
		return card[0]
	})

	convertedDeck.cards = cards.filter(card => {
		return cardsInDeck.indexOf(card.dbfId) > 0
	})

	convertedDeck.cards = convertedDeck.cards.map(card => {
		let quantity = deck.cards.find(deckCard => {
			return deckCard[0] === card.dbfId
		})[1]

		card.quantity = quantity

		return card
	})

	convertedDeck.hero = cards.find(card => deck.heroes[0] === card.dbfId)

	return convertedDeck
}

module.exports = (req, res) => {
	const { body } = req
	console.log('\nReq: ', req, '\n')
	console.log('\nBody: ', body, '\n')

	if (!body.deckstring) {
		return res.status(400).send('You need to provide a deckstring.')
	}

	try {
		console.log('body.deckstring: ', body.deckstring)
		let decoded = decode(body.deckstring)
		let deck = convertDeck(decoded)
		return res.status(200).json(deck)
	} catch (err) {
		console.log(`Error: ${err.message}`)
		return res.status(400).send('Invalid deckstring provided. Try again.')
	}
}
