const Pool = require("pg").Pool;

const pool = new Pool({
    user:"rhuijitkydpord",
    password:"14ec022c01b999a5f15363cf63b18f3bb9180f48f1b5c7fa9aabd4cbd336380f",
    database:"d6q5704oqrvd16",
    host:"ec2-3-226-163-72.compute-1.amazonaws.com",
    port:5432,
    ssl:{rejectUnauthorized: false}
})

module.exports = pool;