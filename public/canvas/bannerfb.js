
const fs = require("fs-extra")
const { loadImage, createCanvas, registerFont, Canvas } = require("canvas");
exports.name = '/bannerfb';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
  var
  age         = req.query.age,
  name        = req.query.name;
///////////////////////////////////////////////////////////////////////////////////
	if(!age || !name) return res.json({"messsage":"Thiếu dữ liệu để thực hiện"})
///////////////////////////////////////////////////////////////////////////////////
  let bg1   = await loadImage(__dirname+'/cache/net1.png');
////////////////////////////Canvas///////////////////////////////////////////////
  registerFont(__dirname+"/cache/AR DARLING.ttf", {family: "AR DARLING"});
  registerFont(__dirname+"/cache/Scripture.ttf", {family: "Scripture"});

var canvas = createCanvas(bg1.width, bg1.height);
var e = canvas.getContext("2d");
                                         
e.fillStyle = m;
e.fillRect(0, 0, canvas.width, canvas.height);
e.restore();
e.save();
e.font = "115px AR DARLING";
e.fillStyle = f;
e.translate(710, 210);
e.rotate(Math.PI / 180 * -1);
e.fillText(age, 0, 0);
e.restore();
e.save();
e.font = "55px Scripture";
e.fillStyle = f;
e.translate(860, 290);
e.rotate(Math.PI / 180 * -8);
e.fillText(name, 0, 0);
e.restore();
e.drawImage(bg, 0, 0);

	const Export = canvas.toBuffer();
 // res.sendfile(Export)
                                           res.type('image/jpeg')
  res.write(Export)
  res.end();
}