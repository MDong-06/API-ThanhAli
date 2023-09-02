exports.name = '/hentaiz/contribute';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const { writeFileSync } = require('fs-extra');
	const data = require('./data/donggop.json');
	var link = req.query.link;
	var name = req.query.name;
	if(!link) return res.json({ error: 'thiếu "link" truyện cần đóng góp' })
	const { resolve } = require("path");
	const pathData = resolve(__dirname, 'data', 'donggop.json');
	var ff = [];
	ff.push({
		link,
		name
	})
	writeFileSync(pathData, JSON.stringify(ff, null, 4))
	return res.json({ 
		error: 0,
		msg: 'đóng góp thành công, truyện sẽ sớm có trên server'
	})
}