var express = require('express');
var router = express.Router();
const validatepackage = require("../../middlewares/validatepackage");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var {package} = require("../../models/package");

/* GET home page. */
router.get('/', async (req, res) => {
  console.log(req.user);
  let packages = await package.find();
  return res.send(packages);
});

router.get('/:id', async (req, res) => {
  try {
  let packages = await package.findById(req.params.id);
  if(!packages)
    return res.status(400).send("package with given id not present");
  return res.send(packages);
  } catch(err) {
    return res.status(400).send("invalid id");
  }
});

//update record
router.put("/:id",validatepackage, async (req, res) => {
  let packages = await package.findById(req.params.id);
  packages.name = req.body.name;
  packages.price = req.body.price;
  await packages.save();
  return res.send(packages);
});

router.delete("/:id", async (req, res) => {
  let packages = await package.findByIdAndDelete(req.params.id);
  return res.send(packages);
});

//add record
router.post("/",validatepackage, async (req, res) => {
  let packages = new package();
  packages.name = req.body.name;
  packages.price = req.body.price;
  await packages.save();
  return res.send(packages);
});

module.exports = router;
