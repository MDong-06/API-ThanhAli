exports.name = '/tiktok/searchvideo';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
var search = req.query.keywords;
if (!search) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://www.tikwm.com/api/feed/search?keywords=',
    data: {    
	keywords: search
	}
})
.then(function (response) {
    var data = response.data
  //  console.log(data)
    return res.json(data)
})
.catch(function (error) {
    return res.json({ error });
});
}