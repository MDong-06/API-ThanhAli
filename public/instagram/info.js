const axios = require("axios");

exports.name = '/instagram/info';
exports.index = async (req, res, next) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const { username } = req.query;
	if (!username)
		return res.json({ error: "Missing username" });
	getInfo(username)
		.then(data => res.json(data))
		.catch(e => res.json({ error: e.message }));
};


async function getInfo(userName) {
	try {
    //                https://www.instagram.com/api/v1/users/web_profile_info/?username=vaan.ilu
		const BASE_URL = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${userName}`;
		const { data } = await axios({
			url: BASE_URL,
			headers: {
				// "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.42",
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"sec-ch-ua": "\"Chromium\";v=\"106\", \"Microsoft Edge\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
				"x-asbd-id": "198387",
				"x-csrftoken": "tJk2tDhaeYfUeJRImgbH75Vp6CV6PjtW",
				"x-ig-app-id": "936619743392459",
				"x-ig-www-claim": "hmac.AR1J85ezeLAD_JJMktFiUuUhjVHkSRyUhbpgfY8stbZcFiRA",
				"x-instagram-ajax": "1006400422",
				"Referer": "https://www.instagram.com/",
				"Referrer-Policy": "strict-origin-when-cross-origin",
        cookie: "csrftoken=f1ScKCurq2hmODCYdI6rBRJTZN385xhd; rur=\"EAG\\05457302567365\\0541705574133:01f7621c66f2fdfe18599532743724a5dfc10bd743226419e36dfa7cedf83708908c1ae1\"; mid=Y8fLcwAEAAFkCBO65nALZw3XJW1Y; ds_user_id=57302567365; ig_did=9C770D37-17C9-4E1A-98CE-FBBF7A5227BF; sessionid=57302567365%3A5pXDIJXbsGHwKF%3A3%3AAYfP-wGIVvfd6tyPEyj8PaXAELM9GsUudSS3K-jmOg"
			},
			"method": "GET"
		});
		const user = data.data.user;
		return {
			biography: user.biography,
			followers: user.edge_followed_by.count,
			following: user.edge_follow.count,
			full_name: user.full_name,
			picture_url: user.profile_pic_url_hd,
			posts: user.edge_owner_to_timeline_media,
			reels: user.highlight_reel_count,
			private: user.is_private,
			verified: user.is_verified
		};
	}
	catch (e) {
		throw new Error("Not found");
	}
}