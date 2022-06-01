var express = require('express');
var router = express.Router();
const pool = require("../db");
const tool = require("../Tools");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/report", async (req, res, next) => {
  const {table} = req.body;
  try {
      let data = await pool.query(`SELECT * FROM ${table}`);
      data = data.rows;
      let path = await tool.reportgen(data);
      console.log("success\n",path);
      res.download(path);
  } catch (e) {
      res.send(e.message)
  }
})

module.exports = router;