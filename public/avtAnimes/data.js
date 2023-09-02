exports.name = '/taoanhdep/data';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    let dirPath = __dirname + `/data/data_anime.json`;
    return res.sendFile(dirPath)
}