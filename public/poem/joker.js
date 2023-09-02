exports.name = '/poem/joker';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const joker = require('./data/joker.json');
        var image = joker[Math.floor(Math.random() * joker.length)].trim();
        res.jsonp({
            data: image,
            count: joker.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}