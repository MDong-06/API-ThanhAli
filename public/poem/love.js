exports.name = '/poem/love';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const love = require('./data/love.json');
        var image = love[Math.floor(Math.random() * love.length)].trim();
        res.jsonp({
            data: image,
            count: love.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}