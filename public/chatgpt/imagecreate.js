const axios = require('axios');
const apiKey = "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";

exports.name = '/openai/imagecreate';
exports.index = async (req, res) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const { query } = req.query;
	let { n, size } = req.query;
	if (!query)
		return res.status(400).json({ error: "query is required" });
	if (!n)
		n = 1; // Number of images to generate. Defaults to 1.
	if (n < 1 || n > 10)
		return res.status(400).json({ error: "n must be between 1 and 10" });
	if (!size)
		size = "1024x1024";
	// 256x256, 512x512, or 1024x1024.
	if (!['256x256', '512x512', '1024x1024'].includes(size))
		return res.status(400).json({ error: "size must be 256x256, 512x512, or 1024x1024" });

	try {
		const responseImage = await axios({
			url: "https://api.openai.com/v1/images/generations",
			method: "POST",
			headers: {
				"Authorization": "Bearer " + apiKey,
				"Content-Type": "application/json"
			},
			data: {
				"prompt": query,
				"n": n,
				"size": size
			}
		});
		res.json(responseImage.data);
	}
	catch (err) {
		console.log(err);
		res.status(500).json({ error: err.response.data });
	}
};