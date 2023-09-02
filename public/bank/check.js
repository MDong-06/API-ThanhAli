const dataBank = require('./data/bank.json')
exports.name = '/bank/check';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    var some = dataBank.some(i => i.senderID == req.query.ID)
    return res.json({
        status: some
    })
}