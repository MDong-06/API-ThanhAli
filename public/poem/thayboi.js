exports.name = '/poem/thayboi';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const thayboi = require('./data/thayboi.json');
        var image = thayboi[Math.floor(Math.random() * thayboi.length)].trim();
        res.jsonp({
            data: image,
            count: thayboi.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}