exports.name = '/taoanhdep/list';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    const fs = require('fs-extra');
    let dirPath = __dirname + `/data/list_anime.json`;
    var list_anime = (fs.readFileSync(dirPath, "utf-8"));
    var listt = JSON.parse(list_anime);
    res.jsonp(listt)
}