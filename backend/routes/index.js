var express = require('express');
var router = express.Router();
const pool = require("../db");
const tool = require("../Tools");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/report", async (req, res, next) => {
  const {table} = req.body

  try {
      let data = await pool.query(`SELECT * FROM ${table}`);
      data = data.rows;
      let path = await tool.reportgen(data);
      console.log(path);
      res.json({
        status: "success",
        message: "file successfully downloaded",
        path: path,
        message:"Move the report from path before the next report generation to prevent the file from being overwritten."
       });
    
  } catch (e) {
      res.send(e.message)
  }

})

module.exports = router;