var express = require('express');
var router = express.Router();
const pool = require("../db");
const path = require('path');
const tool = require(path.join(__dirname,"..","tools.js"));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'iPayroll' });
});

router.get("/report/:table", async (req, res, next) => {
  const {table} = req.params;
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