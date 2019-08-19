module.exports = async (req, res) => {
	const { body, query, cookies } = req
	res.json({
		body,
		query,
		cookies
	})
}
