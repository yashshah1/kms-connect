const router = require("express").Router();
const path = require("path");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const returnFile = (req, res) => {
  const { fileName } = isEmpty(req.params) ? { fileName: "blank.png" } : req.params;
  console.log("LOL", fileName);
  res.sendFile(`./uploads/${fileName}`, {
    root: path.join(__dirname, ".."),
  });
};
router.get("/", returnFile);
router.get("/:fileName", returnFile);
// router.get("/:fileName", returnFile);

module.exports = router;
