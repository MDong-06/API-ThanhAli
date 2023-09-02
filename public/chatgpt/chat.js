const axios = require('axios');
const apiKey = "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";

exports.name = '/openai/chat';
exports.index = async (req, res) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const query = req.query.query;
	if (!query)
		return res.status(400).json({ error: "query is required" });
	try {
		const response = await axios({
			url: "https://api.openai.com/v1/completions",
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			data: {
				model: "text-davinci-002",
				prompt: query,
				max_tokens: 4000,
				temperature: 0.7
			}
		});
		res.json(response.data.choices[0]);
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ error: err.response.data });
	}
};